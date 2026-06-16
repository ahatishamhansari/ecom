import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'categories' })
export class Category extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) slug: string;
  @Prop() description?: string;
  @Prop() imageUrl?: string;
  @Prop({ type: Types.ObjectId, ref: 'Category', default: null }) parentId: Types.ObjectId | null;
  @Prop({ default: 0 }) sortOrder: number;
  @Prop({ default: true }) isActive: boolean;

  // Dynamic attribute schema — admin defines which attributes products in this category have
  // e.g. for "Dresses": [{ key: "neckline", label: "Neckline", type: "enum", options: ["v-neck","round","square"] }]
  @Prop({ type: Array, default: [] }) attributeSchema: Array<{
    key: string;
    label: string;
    type: 'string' | 'enum' | 'number' | 'boolean';
    options?: string[];
    required?: boolean;
  }>;

  // SEO
  @Prop() metaTitle?: string;
  @Prop() metaDescription?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ parentId: 1, isActive: 1 });
