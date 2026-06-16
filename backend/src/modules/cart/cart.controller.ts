import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.id);
  }

  @Get('count')
  getCartCount(@Request() req: any) {
    return this.cartService.getCartCount(req.user.id);
  }

  @Post('items')
  addItem(@Request() req: any, @Body() body: { productId: string; variantId: string; quantity?: number }) {
    return this.cartService.addItem(req.user.id, body.productId, body.variantId, body.quantity);
  }

  @Patch('items/:variantId')
  updateItem(@Request() req: any, @Param('variantId') variantId: string, @Body('quantity') quantity: number) {
    return this.cartService.updateItem(req.user.id, variantId, quantity);
  }

  @Delete('items/:variantId')
  removeItem(@Request() req: any, @Param('variantId') variantId: string) {
    return this.cartService.removeItem(req.user.id, variantId);
  }

  @Delete()
  clearCart(@Request() req: any) {
    return this.cartService.clearCart(req.user.id);
  }
}
