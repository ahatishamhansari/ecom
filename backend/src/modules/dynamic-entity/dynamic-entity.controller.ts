import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DynamicEntityService } from './dynamic-entity.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('admin/entities')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class DynamicEntityController {
  constructor(private readonly service: DynamicEntityService) {}

  // Schema endpoints
  @Get() getAllEntities() { return this.service.getAllEntities(); }
  @Get(':key') getEntity(@Param('key') key: string) { return this.service.getEntity(key); }
  @Post() createEntity(@Body() dto: any) { return this.service.createEntity(dto); }
  @Patch(':key/schema') updateSchema(@Param('key') key: string, @Body('fieldSchema') schema: any[]) { return this.service.updateSchema(key, schema); }
  @Delete(':key') deleteEntity(@Param('key') key: string) { return this.service.deleteEntity(key); }

  // Row data endpoints
  @Get(':key/rows') getRows(@Param('key') key: string) { return this.service.getRows(key); }
  @Post(':key/rows') addRow(@Param('key') key: string, @Body() row: any) { return this.service.addRow(key, row); }
  @Patch(':key/rows/:rowId') updateRow(@Param('key') key: string, @Param('rowId') rowId: string, @Body() row: any) { return this.service.updateRow(key, rowId, row); }
  @Delete(':key/rows/:rowId') deleteRow(@Param('key') key: string, @Param('rowId') rowId: string) { return this.service.deleteRow(key, rowId); }
}
