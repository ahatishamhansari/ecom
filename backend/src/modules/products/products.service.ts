import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const slug = dto.slug || this.generateSlug(dto.name);
    return this.productModel.create({ ...dto, slug });
  }

  async findAll(query: {
    page?: number; limit?: number; category?: string; status?: string;
    gender?: string; minPrice?: number; maxPrice?: number;
    sort?: string; featured?: boolean;
  }): Promise<{ products: Product[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 20, category, status = 'active', gender, minPrice, maxPrice, sort, featured } = query;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = { status };
    if (category) filter.categoryId = category;
    if (gender) filter.gender = gender;
    if (featured !== undefined) filter.isFeatured = featured;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.basePrice = {};
      if (minPrice !== undefined) filter.basePrice.$gte = minPrice;
      if (maxPrice !== undefined) filter.basePrice.$lte = maxPrice;
    }

    const sortMap: Record<string, any> = {
      newest: { createdAt: -1 },
      price_asc: { basePrice: 1 },
      price_desc: { basePrice: -1 },
      popular: { totalSold: -1 },
      rating: { avgRating: -1 },
    };
    const sortQuery = sortMap[sort || 'newest'] || { createdAt: -1 };

    const [products, total] = await Promise.all([
      this.productModel.find(filter).sort(sortQuery).skip(skip).limit(limit).lean(),
      this.productModel.countDocuments(filter),
    ]);

    return { products, total, page, limit };
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({ slug, status: 'active' }).lean();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).lean();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, data: Partial<CreateProductDto>): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(id, data, { new: true });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndUpdate(id, { status: 'archived' });
  }

  async getFeatured(limit = 8): Promise<Product[]> {
    return this.productModel.find({ status: 'active', isFeatured: true }).limit(limit).lean();
  }

  async getTrending(limit = 8): Promise<Product[]> {
    return this.productModel.find({ status: 'active', isTrending: true }).limit(limit).lean();
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return this.productModel.find({ _id: { $in: ids } }).lean();
  }

  private generateSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
}
