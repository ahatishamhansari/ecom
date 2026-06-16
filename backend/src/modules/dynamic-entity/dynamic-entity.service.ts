import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DynamicEntityService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Schema management ─────────────────────────────────────────
  async createEntity(data: { entityKey: string; name: string; description?: string; fieldSchema: any }) {
    const exists = await this.prisma.dynamicEntity.findUnique({ where: { entityKey: data.entityKey } });
    if (exists) throw new ConflictException(`Entity "${data.entityKey}" already exists`);
    
    return this.prisma.dynamicEntity.create({
      data: {
        entityKey: data.entityKey,
        name: data.name,
        description: data.description,
        fieldSchema: data.fieldSchema,
      }
    });
  }

  async getAllEntities() {
    return this.prisma.dynamicEntity.findMany({ where: { isActive: true } });
  }

  async getEntity(entityKey: string) {
    const entity = await this.prisma.dynamicEntity.findFirst({
      where: { entityKey, isActive: true },
    });
    if (!entity) throw new NotFoundException(`Entity "${entityKey}" not found`);
    return entity;
  }

  async updateSchema(entityKey: string, fieldSchema: any) {
    const entity = await this.prisma.dynamicEntity.findFirst({ where: { entityKey } });
    if (!entity) throw new NotFoundException(`Entity "${entityKey}" not found`);

    return this.prisma.dynamicEntity.update({
      where: { id: entity.id },
      data: { fieldSchema },
    });
  }

  async deleteEntity(entityKey: string) {
    const entity = await this.prisma.dynamicEntity.findFirst({ where: { entityKey } });
    if (entity) {
      await this.prisma.dynamicEntity.update({
        where: { id: entity.id },
        data: { isActive: false },
      });
    }
  }

  // ── Row (data) management ─────────────────────────────────────
  async getRows(entityKey: string) {
    const entity = await this.getEntity(entityKey);
    return this.prisma.dynamicEntityRow.findMany({
      where: { dynamicEntityId: entity.id },
    });
  }

  async addRow(entityKey: string, rowData: any) {
    const entity = await this.getEntity(entityKey);
    return this.prisma.dynamicEntityRow.create({
      data: {
        dynamicEntityId: entity.id,
        rowData,
      }
    });
  }

  async updateRow(entityKey: string, rowId: string, rowData: any) {
    // Make sure the entity exists to enforce relation logic if needed
    await this.getEntity(entityKey);
    
    const existingRow = await this.prisma.dynamicEntityRow.findUnique({
      where: { id: rowId },
    });
    if (!existingRow) throw new NotFoundException('Row not found');

    return this.prisma.dynamicEntityRow.update({
      where: { id: rowId },
      data: {
        rowData: {
          ...(existingRow.rowData as any),
          ...rowData,
        }
      }
    });
  }

  async deleteRow(entityKey: string, rowId: string) {
    await this.getEntity(entityKey); // Ensures entity exists
    await this.prisma.dynamicEntityRow.delete({
      where: { id: rowId },
    }).catch(() => {
      // Ignore if not found
    });
  }
}
