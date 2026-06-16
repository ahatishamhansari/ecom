import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UiConfigService } from './ui-config.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('ui-config')
export class UiConfigController {
  constructor(private readonly service: UiConfigService) {}

  @Get('pages/:pageKey') getPage(@Param('pageKey') key: string) { return this.service.getPage(key); }

  @Get('pages')
  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN', 'SUPER_ADMIN')
  getAllPages() { return this.service.getAllPages(); }

  @Put('pages/:pageKey')
  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN', 'SUPER_ADMIN')
  updatePage(@Param('pageKey') key: string, @Body('sections') sections: any[]) {
    return this.service.updatePage(key, sections);
  }
}
