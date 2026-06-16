import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UiConfigService } from './ui-config.service';
import { UiConfigController } from './ui-config.controller';
import { UiConfig, UiConfigSchema } from './schemas/ui-config.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: UiConfig.name, schema: UiConfigSchema }])],
  providers: [UiConfigService],
  controllers: [UiConfigController],
  exports: [UiConfigService],
})
export class UiConfigModule {}
