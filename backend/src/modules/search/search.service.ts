import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from '../products/products.service';
import { Meilisearch } from 'meilisearch';

@Injectable()
export class SearchService implements OnModuleInit {
  private client: InstanceType<typeof Meilisearch>;
  private readonly logger = new Logger(SearchService.name);
  private readonly INDEX = 'products';

  constructor(
    private readonly config: ConfigService,
    private readonly productsService: ProductsService,
  ) {
    this.client = new Meilisearch({
      host: this.config.get<string>('MEILI_HOST') || 'http://localhost:7700',
      apiKey: this.config.get<string>('MEILI_API_KEY'),
    });
  }

  async onModuleInit() {
    try {
      const index = this.client.index(this.INDEX);
      await index.updateSettings({
        searchableAttributes: ['name', 'shortDescription', 'tags', 'brand', 'attributes'],
        filterableAttributes: ['categoryId', 'gender', 'status', 'isFeatured', 'isTrending', 'basePrice', 'dominantColors', 'productType'],
        sortableAttributes: ['basePrice', 'createdAt', 'totalSold', 'avgRating'],
        displayedAttributes: ['id', 'name', 'slug', 'thumbnailUrl', 'basePrice', 'compareAtPrice', 'brand', 'gender', 'categoryId', 'status', 'isFeatured', 'tags'],
      });
      this.logger.log('MeiliSearch index configured');
    } catch (e) {
      this.logger.warn('MeiliSearch not available — search will degrade gracefully');
    }
  }

  async search(query: string, options?: {
    page?: number; limit?: number;
    filter?: string; sort?: string[];
  }) {
    try {
      const { page = 1, limit = 20, filter, sort } = options || {};
      const result = await this.client.index(this.INDEX).search(query, {
        offset: (page - 1) * limit,
        limit,
        filter,
        sort,
      });
      return { hits: result.hits, total: result.estimatedTotalHits, page, limit };
    } catch {
      // Graceful fallback to MongoDB text search
      return this.productsService.findAll({ page: options?.page, limit: options?.limit });
    }
  }

  async indexProduct(product: any) {
    try {
      await this.client.index(this.INDEX).addDocuments([{
        id: product._id?.toString(),
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        tags: product.tags,
        brand: product.brand,
        gender: product.gender,
        categoryId: product.categoryId?.toString(),
        status: product.status,
        isFeatured: product.isFeatured,
        isTrending: product.isTrending,
        basePrice: product.basePrice,
        compareAtPrice: product.compareAtPrice,
        thumbnailUrl: product.thumbnailUrl,
        dominantColors: product.dominantColors,
        productType: product.productType,
        attributes: JSON.stringify(product.attributes || {}),
        createdAt: product.createdAt,
      }]);
    } catch (e) {
      this.logger.warn(`Failed to index product ${product._id}`);
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.client.index(this.INDEX).deleteDocument(id);
    } catch {}
  }
}
