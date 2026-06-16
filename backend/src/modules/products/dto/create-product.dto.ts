import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, IsEnum, IsObject } from 'class-validator';

export class CreateProductDto {
  @IsString() name: string;
  @IsString() @IsOptional() slug?: string;
  @IsString() @IsOptional() shortDescription?: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() metaTitle?: string;
  @IsString() @IsOptional() metaDescription?: string;
  @IsArray() @IsOptional() tags?: string[];
  @IsString() @IsOptional() categoryId?: string;
  @IsArray() @IsOptional() collectionIds?: string[];
  @IsEnum(['clothing', 'shoes', 'accessories', 'bags']) @IsOptional() productType?: string;
  @IsArray() @IsOptional() images?: string[];
  @IsString() @IsOptional() thumbnailUrl?: string;
  @IsObject() @IsOptional() attributes?: Record<string, any>;
  @IsArray() @IsOptional() dominantColors?: string[];
  @IsString() @IsOptional() gender?: string;
  @IsString() @IsOptional() season?: string;
  @IsArray() @IsOptional() occasions?: string[];
  @IsNumber() basePrice: number;
  @IsNumber() @IsOptional() compareAtPrice?: number;
  @IsString() @IsOptional() currency?: string;
  @IsArray() @IsOptional() variants?: any[];
  @IsEnum(['draft', 'active', 'archived']) @IsOptional() status?: string;
  @IsBoolean() @IsOptional() isFeatured?: boolean;
  @IsBoolean() @IsOptional() isTrending?: boolean;
  @IsString() @IsOptional() brand?: string;
  @IsString() @IsOptional() vendor?: string;
}
