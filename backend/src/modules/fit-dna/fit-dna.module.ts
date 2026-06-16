import { Module } from '@nestjs/common';
import { FitDnaService } from './fit-dna.service';
import { FitDnaController } from './fit-dna.controller';

@Module({
  providers: [FitDnaService],
  controllers: [FitDnaController],
  exports: [FitDnaService],
})
export class FitDnaModule {}
