import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService, UserEvent } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // Public endpoint for frontend to stream events
  @Post('track')
  async trackEvent(@Body() event: Omit<UserEvent, 'timestamp'>) {
    await this.analyticsService.trackEvent({
      ...event,
      timestamp: new Date(),
    });
    return { status: 'queued' };
  }

  // Admin endpoint for querying aggregate data
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get('trending-products')
  async getTrendingProducts(@Query('days') days?: string) {
    const numDays = days ? parseInt(days, 10) : 7;
    return this.analyticsService.getTrendingProducts(numDays);
  }
}
