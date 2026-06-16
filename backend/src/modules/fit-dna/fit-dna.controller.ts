import { Controller, Get, Put, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { FitDnaService } from './fit-dna.service';
import type { FitDnaDto } from './fit-dna.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('fit-dna')
@UseGuards(JwtAuthGuard)
export class FitDnaController {
  constructor(private readonly fitDnaService: FitDnaService) {}

  @Get('me')
  getMyFitDna(@Request() req: any) {
    return this.fitDnaService.get(req.user.id);
  }

  @Put('me')
  upsertMyFitDna(@Request() req: any, @Body() dto: FitDnaDto) {
    return this.fitDnaService.upsert(req.user.id, dto);
  }

  @Post('recommend/:productId')
  recommendSize(
    @Request() req: any,
    @Param('productId') productId: string,
    @Body('variants') variants: { size: string; chest?: number; waist?: number }[],
  ) {
    return this.fitDnaService.recommendSize(req.user.id, productId, variants);
  }
}
