import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { createClient, ClickHouseClient } from '@clickhouse/client';
import { ConfigService } from '@nestjs/config';

export interface UserEvent {
  userId?: string;
  sessionId: string;
  eventType: 'click' | 'view' | 'purchase' | 'add_to_cart';
  entityId?: string; // Product ID, Category ID, etc.
  entityType?: 'product' | 'category' | 'page';
  url: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

@Injectable()
export class AnalyticsService implements OnModuleInit, OnModuleDestroy {
  private client: ClickHouseClient;
  private readonly logger = new Logger(AnalyticsService.name);
  private batch: any[] = [];
  private readonly batchSize = 100;
  private batchTimer: NodeJS.Timeout;

  constructor(private configService: ConfigService) {
    // Note: Use environment variables in production.
    this.client = createClient({
      host: this.configService.get<string>('CLICKHOUSE_HOST', 'http://localhost:8123'),
      username: this.configService.get<string>('CLICKHOUSE_USER', 'default'),
      password: this.configService.get<string>('CLICKHOUSE_PASSWORD', ''),
      database: 'default',
    });
  }

  async onModuleInit() {
    try {
      await this.initSchema();
      this.logger.log('ClickHouse client initialized and schema ensured.');
      
      // Setup batch flusher
      this.batchTimer = setInterval(() => this.flushBatch(), 5000);
    } catch (e) {
      this.logger.error('Failed to initialize ClickHouse:', e.message);
    }
  }

  async onModuleDestroy() {
    clearInterval(this.batchTimer);
    await this.flushBatch();
    await this.client.close();
  }

  private async initSchema() {
    await this.client.command({
      query: `
        CREATE TABLE IF NOT EXISTS user_events (
          user_id String,
          session_id String,
          event_type String,
          entity_id String,
          entity_type String,
          url String,
          metadata String,
          timestamp DateTime
        ) ENGINE = MergeTree()
        ORDER BY (event_type, timestamp)
      `
    });
  }

  async trackEvent(event: UserEvent) {
    this.batch.push({
      user_id: event.userId || '',
      session_id: event.sessionId,
      event_type: event.eventType,
      entity_id: event.entityId || '',
      entity_type: event.entityType || '',
      url: event.url,
      metadata: event.metadata ? JSON.stringify(event.metadata) : '',
      timestamp: event.timestamp.toISOString().replace('T', ' ').substring(0, 19),
    });

    if (this.batch.length >= this.batchSize) {
      await this.flushBatch();
    }
  }

  private async flushBatch() {
    if (this.batch.length === 0) return;

    const currentBatch = [...this.batch];
    this.batch = [];

    try {
      await this.client.insert({
        table: 'user_events',
        values: currentBatch,
        format: 'JSONEachRow',
      });
      this.logger.debug(`Flushed ${currentBatch.length} events to ClickHouse.`);
    } catch (error) {
      this.logger.error('Failed to insert batch into ClickHouse', error.message);
      // Optional: push back to batch or dead letter queue
    }
  }

  // Example Query Method for Dashboard
  async getTrendingProducts(days: number = 7) {
    const resultSet = await this.client.query({
      query: `
        SELECT entity_id, count(*) as views
        FROM user_events
        WHERE event_type = 'view' AND entity_type = 'product'
        AND timestamp >= subtractDays(now(), ${days})
        GROUP BY entity_id
        ORDER BY views DESC
        LIMIT 10
      `,
      format: 'JSONEachRow',
    });
    return resultSet.json();
  }
}
