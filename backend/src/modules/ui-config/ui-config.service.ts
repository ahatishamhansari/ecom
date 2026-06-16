import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UiConfig } from './schemas/ui-config.schema';

@Injectable()
export class UiConfigService {
  constructor(@InjectModel(UiConfig.name) private uiConfigModel: Model<UiConfig>) {}

  async getPage(pageKey: string) {
    let config = await this.uiConfigModel.findOne({ pageKey, isActive: true }).lean();
    if (!config) {
      // Return a sensible default for homepage if none configured
      config = this.getDefaultHomepage() as any;
    }
    return config;
  }

  async updatePage(pageKey: string, sections: any[]) {
    return this.uiConfigModel.findOneAndUpdate(
      { pageKey },
      { sections, isActive: true, name: pageKey },
      { upsert: true, new: true },
    );
  }

  async getAllPages() {
    return this.uiConfigModel.find({ isActive: true }, { sections: 0 }).lean();
  }

  private getDefaultHomepage() {
    return {
      pageKey: 'homepage',
      sections: [
        { id: 'hero', type: 'hero_banner', isVisible: true, sortOrder: 1, config: { title: 'New Season Arrivals', subtitle: 'Discover curated fashion', ctaText: 'Shop Now', ctaLink: '/products', imageUrl: '' } },
        { id: 'featured', type: 'featured_products', isVisible: true, sortOrder: 2, config: { title: 'Featured', limit: 8 } },
        { id: 'trending', type: 'trending', isVisible: true, sortOrder: 3, config: { title: 'Trending Now', limit: 8 } },
        { id: 'categories', type: 'category_grid', isVisible: true, sortOrder: 4, config: { title: 'Shop by Category' } },
        { id: 'newsletter', type: 'newsletter', isVisible: true, sortOrder: 5, config: { title: 'Stay in the Loop', subtitle: 'Get exclusive drops and offers' } },
      ],
    };
  }
}
