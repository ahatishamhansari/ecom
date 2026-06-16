import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DynamicEntityService } from './dynamic-entity.service';
import { DynamicEntityController } from './dynamic-entity.controller';
import { DynamicEntity, DynamicEntitySchema } from './schemas/dynamic-entity.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DynamicEntity.name, schema: DynamicEntitySchema }])],
  providers: [DynamicEntityService],
  controllers: [DynamicEntityController],
  exports: [DynamicEntityService],
})
export class DynamicEntityModule {}
