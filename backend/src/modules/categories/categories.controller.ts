import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get() findAll() { return this.categoriesService.findAll(); }
  @Get('tree') getTree() { return this.categoriesService.getTree(); }
  @Get(':slug') findBySlug(@Param('slug') slug: string) { return this.categoriesService.findBySlug(slug); }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN', 'SUPER_ADMIN')
  create(@Body() dto: any) { return this.categoriesService.create(dto); }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN', 'SUPER_ADMIN')
  update(@Param('id') id: string, @Body() dto: any) { return this.categoriesService.update(id, dto); }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN', 'SUPER_ADMIN')
  delete(@Param('id') id: string) { return this.categoriesService.delete(id); }
}
