import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async findAll() {
    return this.categoryModel.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
  }

  async findBySlug(slug: string) {
    const cat = await this.categoryModel.findOne({ slug, isActive: true }).lean();
    if (!cat) throw new NotFoundException('Category not found');
    return cat;
  }

  async getTree() {
    const all = await this.categoryModel.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
    const roots = all.filter((c) => !c.parentId);
    const map = (parent: any) => ({
      ...parent,
      children: all.filter((c) => String(c.parentId) === String(parent._id)).map(map),
    });
    return roots.map(map);
  }

  async create(data: any) {
    return this.categoryModel.create(data);
  }

  async update(id: string, data: any) {
    const cat = await this.categoryModel.findByIdAndUpdate(id, data, { new: true });
    if (!cat) throw new NotFoundException('Category not found');
    return cat;
  }

  async delete(id: string) {
    await this.categoryModel.findByIdAndUpdate(id, { isActive: false });
  }
}
