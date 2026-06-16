import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DynamicEntityService } from './dynamic-entity.service';
import { DynamicEntityController } from './dynamic-entity.controller';

@Module({
  imports: [PrismaModule],
  providers: [DynamicEntityService],
  controllers: [DynamicEntityController],
  exports: [DynamicEntityService],
})
export class DynamicEntityModule {}
