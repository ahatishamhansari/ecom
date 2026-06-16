import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// ─── Variant Sub-document ─────────────────────────────────────────────────────
@Schema({ _id: true })
export class ProductVariant {
  _id: Types.ObjectId;

  @Prop({ required: true }) sku: string;
  @Prop({ required: true }) name: string; // e.g. "Red / XL"

  // Dynamic variant options (size, color, material, etc.)
  @Prop({ type: Object, default: {} }) options: Record<string, string>;

  @Prop({ required: true }) price: number;
  @Prop() compareAtPrice?: number;
  @Prop({ default: 0 }) weight?: number; // grams

  @Prop([String]) images: string[];
  @Prop({ default: true }) isActive: boolean;
}

export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);

// ─── Product Document ─────────────────────────────────────────────────────────
@Schema({ timestamps: true, collection: 'products' })
export class Product extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) slug: string;
  @Prop() shortDescription?: string;
  @Prop() description?: string; // AI-generated SEO description

  // SEO
  @Prop() metaTitle?: string;
  @Prop() metaDescription?: string;
  @Prop([String]) tags: string[];

  // Catalog
  @Prop({ type: Types.ObjectId, ref: 'Category' }) categoryId: Types.ObjectId;
  @Prop([{ type: Types.ObjectId, ref: 'Category' }]) collectionIds: Types.ObjectId[];
  @Prop({ type: String, enum: ['clothing', 'shoes', 'accessories', 'bags'] })
  productType: string;

  // Media
  @Prop([String]) images: string[];         // CDN URLs
  @Prop() thumbnailUrl?: string;
  @Prop([String]) videoUrls?: string[];

  // Dynamic attributes — admin defines schema per product type
  // e.g. { sleeve: "long", fabric: "cotton", fit: "slim", neckline: "v-neck" }
  @Prop({ type: Object, default: {} }) attributes: Record<string, any>;

  // Color palette (extracted by CV pipeline)
  @Prop([String]) dominantColors: string[];  // hex codes

  // Fashion-specific
  @Prop() gender?: string;    // men, women, unisex, kids
  @Prop() season?: string;    // SS25, AW25, all-season
  @Prop([String]) occasions: string[]; // casual, formal, party, sportswear

  // Pricing
  @Prop({ required: true }) basePrice: number;
  @Prop() compareAtPrice?: number;
  @Prop({ default: 'INR' }) currency: string;

  // Variants (sizes, colors, etc.)
  @Prop({ type: [ProductVariantSchema], default: [] }) variants: ProductVariant[];

  // CLIP embedding for visual search (512-dim vector stored in Qdrant, ID stored here)
  @Prop() qdrantPointId?: string;

  // Status
  @Prop({ type: String, enum: ['draft', 'active', 'archived'], default: 'draft' })
  status: string;

  @Prop({ default: false }) isFeatured: boolean;
  @Prop({ default: false }) isTrending: boolean;
  @Prop({ default: 0 }) sortOrder: number;

  // Vendor / Brand
  @Prop() brand?: string;
  @Prop() vendor?: string;

  // Stats (denormalized for performance)
  @Prop({ default: 0 }) totalSold: number;
  @Prop({ default: 0 }) avgRating: number;
  @Prop({ default: 0 }) reviewCount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Indexes for performance
ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ categoryId: 1, status: 1 });
ProductSchema.index({ status: 1, isFeatured: 1 });
ProductSchema.index({ status: 1, isTrending: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
