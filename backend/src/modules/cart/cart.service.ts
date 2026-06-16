import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addItem(userId: string, productId: string, variantId: string, quantity = 1) {
    return this.prisma.cartItem.upsert({
      where: { userId_variantId: { userId, variantId } },
      update: { quantity: { increment: quantity } },
      create: { userId, productId, variantId, quantity },
    });
  }

  async updateItem(userId: string, variantId: string, quantity: number) {
    if (quantity <= 0) return this.removeItem(userId, variantId);
    return this.prisma.cartItem.update({
      where: { userId_variantId: { userId, variantId } },
      data: { quantity },
    });
  }

  async removeItem(userId: string, variantId: string) {
    return this.prisma.cartItem.deleteMany({
      where: { userId, variantId },
    });
  }

  async clearCart(userId: string) {
    return this.prisma.cartItem.deleteMany({ where: { userId } });
  }

  async getCartCount(userId: string): Promise<number> {
    const result = await this.prisma.cartItem.aggregate({
      where: { userId },
      _sum: { quantity: true },
    });
    return result._sum.quantity || 0;
  }
}
