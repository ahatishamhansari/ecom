import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * DynamicEntity — The "Admin creates tables" feature.
 * Each document represents a user-defined data structure (schema + rows).
 * Think of it as an internal Airtable/Notion Database.
 */
@Schema({ timestamps: true, collection: 'dynamic_entities' })
export class DynamicEntity extends Document {
  @Prop({ required: true, unique: true }) entityKey: string; // e.g. "summer_lookbook_2025"
  @Prop({ required: true }) name: string;                    // Display name
  @Prop() description?: string;
  @Prop() icon?: string;                                     // emoji or icon name

  // Admin-defined schema for this entity's fields
  @Prop({ type: Array, default: [] })
  fieldSchema: Array<{
    key: string;           // field key (snake_case)
    label: string;         // display label
    type: 'text' | 'number' | 'boolean' | 'enum' | 'date' | 'media' | 'ref' | 'ref[]';
    options?: string[];    // for enum type
    refEntity?: string;    // for ref type — references another entity or 'products'
    required?: boolean;
    defaultValue?: any;
  }>;

  // All rows stored here as an array of JSON objects
  @Prop({ type: Array, default: [] })
  rows: Record<string, any>[];

  @Prop({ default: true }) isActive: boolean;
  @Prop({ default: 'ADMIN' }) createdByRole: string;
}

export const DynamicEntitySchema = SchemaFactory.createForClass(DynamicEntity);
DynamicEntitySchema.index({ entityKey: 1 }, { unique: true });
