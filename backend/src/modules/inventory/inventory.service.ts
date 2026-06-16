import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getByVariantId(variantId: string) {
    return this.prisma.inventory.findUnique({ where: { variantId } });
  }

  async upsert(variantId: string, sku: string, quantity: number, lowStockAt = 5) {
    return this.prisma.inventory.upsert({
      where: { variantId },
      update: { quantity, lowStockAt },
      create: { variantId, sku, quantity, lowStockAt },
    });
  }

  async reserve(variantId: string, qty: number) {
    const inv = await this.prisma.inventory.findUnique({ where: { variantId } });
    if (!inv) throw new NotFoundException('Inventory not found');
    const available = inv.quantity - inv.reservedQty;
    if (available < qty) throw new BadRequestException(`Only ${available} units available`);
    return this.prisma.inventory.update({
      where: { variantId },
      data: { reservedQty: { increment: qty } },
    });
  }

  async confirm(variantId: string, qty: number) {
    return this.prisma.inventory.update({
      where: { variantId },
      data: { quantity: { decrement: qty }, reservedQty: { decrement: qty } },
    });
  }

  async release(variantId: string, qty: number) {
    return this.prisma.inventory.update({
      where: { variantId },
      data: { reservedQty: { decrement: qty } },
    });
  }

  async getLowStock() {
    return this.prisma.$queryRaw`
      SELECT * FROM inventory
      WHERE quantity - "reservedQty" <= "lowStockAt"
    `;
  }
}
