import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * UiConfig — Admin controls the storefront layout via this collection.
 * Each document is a named page section config (e.g. homepage sections order,
 * banner content, featured collection slug, etc.)
 */
@Schema({ timestamps: true, collection: 'ui_configs' })
export class UiConfig extends Document {
  @Prop({ required: true, unique: true }) pageKey: string; // e.g. "homepage", "sale_page"
  @Prop() name?: string;

  // Ordered list of sections to render on this page
  @Prop({ type: Array, default: [] })
  sections: Array<{
    id: string;
    type: 'hero_banner' | 'featured_products' | 'category_grid' | 'promo_strip' | 'newsletter' | 'lookbook' | 'trending' | 'custom_html';
    isVisible: boolean;
    sortOrder: number;
    config: Record<string, any>; // section-specific config (title, subtitle, image, collectionSlug, etc.)
  }>;

  @Prop({ default: true }) isActive: boolean;
}

export const UiConfigSchema = SchemaFactory.createForClass(UiConfig);
UiConfigSchema.index({ pageKey: 1 }, { unique: true });
