import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Public
  @Get()
  findAll(
    @Query('page') page?: string, @Query('limit') limit?: string,
    @Query('category') category?: string, @Query('gender') gender?: string,
    @Query('minPrice') minPrice?: string, @Query('maxPrice') maxPrice?: string,
    @Query('sort') sort?: string, @Query('featured') featured?: string,
  ) {
    return this.productsService.findAll({
      page: page ? +page : 1, limit: limit ? +limit : 20,
      category, gender, sort,
      minPrice: minPrice ? +minPrice : undefined,
      maxPrice: maxPrice ? +maxPrice : undefined,
      featured: featured !== undefined ? featured === 'true' : undefined,
    });
  }

  @Get('featured')
  getFeatured(@Query('limit') limit?: string) {
    return this.productsService.getFeatured(limit ? +limit : 8);
  }

  @Get('trending')
  getTrending(@Query('limit') limit?: string) {
    return this.productsService.getTrending(limit ? +limit : 8);
  }

  @Get('batch')
  findByIds(@Query('ids') ids: string) {
    if (!ids) return [];
    return this.productsService.findByIds(ids.split(','));
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  // Admin only
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  update(@Param('id') id: string, @Body() dto: Partial<CreateProductDto>) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
