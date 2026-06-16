import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { CreateOrderDto } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, dto);
  }

  @Get('my')
  findMyOrders(@Request() req: any, @Query('page') page?: string, @Query('limit') limit?: string) {
    return this.ordersService.findByUser(req.user.id, page ? +page : 1, limit ? +limit : 10);
  }

  @Get('my/:id')
  findMyOrder(@Request() req: any, @Param('id') id: string) {
    return this.ordersService.findById(id, req.user.id);
  }

  @Get()
  @UseGuards(RolesGuard) @Roles('ADMIN', 'SUPER_ADMIN')
  findAll(@Query('page') page?: string, @Query('limit') limit?: string, @Query('status') status?: string) {
    return this.ordersService.findAll(page ? +page : 1, limit ? +limit : 20, status);
  }

  @Get(':id')
  @UseGuards(RolesGuard) @Roles('ADMIN', 'SUPER_ADMIN')
  findOne(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard) @Roles('ADMIN', 'SUPER_ADMIN')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }
}
