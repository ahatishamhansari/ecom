import { Controller, Get, Patch, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Request() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @Patch('me')
  updateProfile(@Request() req: any, @Body() body: { name?: string; avatarUrl?: string }) {
    return this.usersService.updateProfile(req.user.id, body);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  findAll(@Query('page') page = '1', @Query('limit') limit = '20') {
    return this.usersService.findAll(+page, +limit);
  }

  @Patch(':id/role')
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN')
  updateRole(@Param('id') id: string, @Body('role') role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN') {
    return this.usersService.updateRole(id, role);
  }
}
