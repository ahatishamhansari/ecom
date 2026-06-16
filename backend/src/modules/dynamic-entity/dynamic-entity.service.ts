import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DynamicEntity } from './schemas/dynamic-entity.schema';

@Injectable()
export class DynamicEntityService {
  constructor(@InjectModel(DynamicEntity.name) private entityModel: Model<DynamicEntity>) {}

  // ── Schema management ─────────────────────────────────────────
  async createEntity(data: { entityKey: string; name: string; description?: string; icon?: string; fieldSchema: any[] }) {
    const exists = await this.entityModel.findOne({ entityKey: data.entityKey });
    if (exists) throw new ConflictException(`Entity "${data.entityKey}" already exists`);
    return this.entityModel.create(data);
  }

  async getAllEntities() {
    return this.entityModel.find({ isActive: true }, { rows: 0 }).lean();
  }

  async getEntity(entityKey: string) {
    const entity = await this.entityModel.findOne({ entityKey, isActive: true }).lean();
    if (!entity) throw new NotFoundException(`Entity "${entityKey}" not found`);
    return entity;
  }

  async updateSchema(entityKey: string, fieldSchema: any[]) {
    const entity = await this.entityModel.findOneAndUpdate(
      { entityKey }, { fieldSchema }, { new: true }
    );
    if (!entity) throw new NotFoundException(`Entity "${entityKey}" not found`);
    return entity;
  }

  async deleteEntity(entityKey: string) {
    await this.entityModel.findOneAndUpdate({ entityKey }, { isActive: false });
  }

  // ── Row (data) management ─────────────────────────────────────
  async getRows(entityKey: string) {
    const entity = await this.entityModel.findOne({ entityKey, isActive: true }, { rows: 1 }).lean();
    if (!entity) throw new NotFoundException(`Entity "${entityKey}" not found`);
    return entity.rows;
  }

  async addRow(entityKey: string, rowData: Record<string, any>) {
    const rowWithId = { _rowId: new Date().getTime().toString(), ...rowData, createdAt: new Date() };
    await this.entityModel.updateOne({ entityKey }, { $push: { rows: rowWithId } });
    return rowWithId;
  }

  async updateRow(entityKey: string, rowId: string, rowData: Record<string, any>) {
    const entity = await this.entityModel.findOne({ entityKey });
    if (!entity) throw new NotFoundException(`Entity "${entityKey}" not found`);
    const rowIndex = entity.rows.findIndex((r: any) => r._rowId === rowId);
    if (rowIndex === -1) throw new NotFoundException('Row not found');
    entity.rows[rowIndex] = { ...entity.rows[rowIndex], ...rowData, updatedAt: new Date() };
    entity.markModified('rows');
    await entity.save();
    return entity.rows[rowIndex];
  }

  async deleteRow(entityKey: string, rowId: string) {
    await this.entityModel.updateOne({ entityKey }, { $pull: { rows: { _rowId: rowId } } });
  }
}
