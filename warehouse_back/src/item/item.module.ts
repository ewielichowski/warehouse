import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemRequest } from './request.entity';
import { RequestController } from './request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), TypeOrmModule.forFeature([ItemRequest])],
  providers: [ItemService],
  controllers: [ItemController, RequestController]
})
export class ItemModule {}
