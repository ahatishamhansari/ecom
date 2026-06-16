import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';

export interface CreateOrderDto {
  addressId: string;
  items: { productId: string; variantId: string; productName: string; variantName: string; sku: string; imageUrl?: string; quantity: number; unitPrice: number }[];
  couponCode?: string;
  notes?: string;
}

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly inventoryService: InventoryService,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    // Use a Prisma transaction for atomic order creation + inventory reservation
    return this.prisma.$transaction(async (tx) => {
      const subtotal = dto.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
      const taxAmount = +(subtotal * 0.18).toFixed(2); // 18% GST
      const shippingAmount = subtotal > 999 ? 0 : 99;
      const totalAmount = subtotal + taxAmount + shippingAmount;

      const order = await tx.order.create({
        data: {
          userId, addressId: dto.addressId,
          subtotal, taxAmount, shippingAmount, totalAmount,
          couponCode: dto.couponCode, notes: dto.notes,
          items: {
            create: dto.items.map((i) => ({
              productId: i.productId, variantId: i.variantId,
              productName: i.productName, variantName: i.variantName,
              sku: i.sku, imageUrl: i.imageUrl,
              quantity: i.quantity, unitPrice: i.unitPrice,
              totalPrice: +(i.unitPrice * i.quantity).toFixed(2),
            })),
          },
        },
        include: { items: true },
      });

      // Reserve inventory for each item
      for (const item of dto.items) {
        await this.inventoryService.reserve(item.variantId, item.quantity);
      }

      // Clear cart
      await tx.cartItem.deleteMany({ where: { userId } });

      return order;
    });
  }

  async findByUser(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [orders, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({ where: { userId }, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { items: true, address: true } }),
      this.prisma.order.count({ where: { userId } }),
    ]);
    return { orders, total, page, limit };
  }

  async findById(id: string, userId?: string) {
    const where: any = { id };
    if (userId) where.userId = userId;
    const order = await this.prisma.order.findFirst({ where, include: { items: true, address: true } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findAll(page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;
    const [orders, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { items: true, address: true, user: { select: { email: true, name: true } } } }),
      this.prisma.order.count({ where }),
    ]);
    return { orders, total, page, limit };
  }

  async updateStatus(id: string, status: string) {
    const order = await this.prisma.order.findUnique({ where: { id }, include: { items: true } });
    if (!order) throw new NotFoundException('Order not found');
    if (status === 'DELIVERED') {
      for (const item of order.items) {
        await this.inventoryService.confirm(item.variantId, item.quantity);
      }
    }
    if (status === 'CANCELLED') {
      for (const item of order.items) {
        await this.inventoryService.release(item.variantId, item.quantity);
      }
    }
    return this.prisma.order.update({ where: { id }, data: { status: status as any } });
  }
}
