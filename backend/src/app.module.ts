import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SearchModule } from './modules/search/search.module';
import { FitDnaModule } from './modules/fit-dna/fit-dna.module';
import { DynamicEntityModule } from './modules/dynamic-entity/dynamic-entity.module';
import { UiConfigModule } from './modules/ui-config/ui-config.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    // Config (loads .env)
    ConfigModule.forRoot({ isGlobal: true }),

    // MongoDB (Product Catalog, Dynamic Entities, UI Config)
    MongooseModule.forRoot(process.env.MONGO_URI!),

    // PostgreSQL via Prisma (Users, Orders, Inventory)
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    InventoryModule,
    SearchModule,
    FitDnaModule,
    DynamicEntityModule,
    UiConfigModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
