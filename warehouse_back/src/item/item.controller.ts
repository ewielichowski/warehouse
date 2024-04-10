import { Controller, Get, Post, Put, Delete, Param, Body, Query} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemDto } from './dto/create-item.dto';


@Controller('item')
export class ItemController {
    constructor(
        private readonly itemService: ItemService
    ) {}

    @Post() // Handle HTTP POST requests to create a item
    create(@Body() createItemDto: CreateItemDto): Promise<Item> {
      return this.itemService.createItem(createItemDto);
    }
  
    @Get()
    find(   @Query('page') page: number = 1, 
            @Query('pageSize') pageSize: number = 10,
            @Query('orderBy') orderBy: string = 'id',
            @Query('order') order: string = 'ASC'): Promise<{ items: Item[], itemCount: number}>  {
        return this.itemService.findItems(page, pageSize, orderBy, order);
    }


    @Get(':id') // requests to retrieve an item by ID
    findOne(@Param('id') id: string): Promise<Item> {
      return this.itemService.findOneItem(+id);
    }
  
    @Put(':id') // PUT requests to update item by ID
    update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
      return this.itemService.updateItem(+id, updateItemDto);
    }
  
    @Delete(':id') // HTTP DELETE requests to remove an item by ID
    remove(@Param('id') id: string) {
      return this.itemService.removeItem( +id);
    }
}
