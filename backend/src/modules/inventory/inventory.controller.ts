import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('low-stock') getLowStock() { return this.inventoryService.getLowStock(); }
  @Get(':variantId') getByVariant(@Param('variantId') variantId: string) { return this.inventoryService.getByVariantId(variantId); }

  @Post('upsert')
  upsert(@Body() body: { variantId: string; sku: string; quantity: number; lowStockAt?: number }) {
    return this.inventoryService.upsert(body.variantId, body.sku, body.quantity, body.lowStockAt);
  }
}
