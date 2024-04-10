import { Controller, Get, Post, Put, Delete, Param, Body, Query} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { ItemRequest } from './request.entity';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ItemService } from './item.service';


@Controller('request')
export class RequestController {
    constructor(
        private readonly requestService: ItemService
    ) {}

    @Post()
    create(@Body()  createRequestPayload): Promise<ItemRequest> {
        return this.requestService.createRequest(createRequestPayload);
    }

    @Get()
    find(   @Query('page') page: number = 1, 
            @Query('pageSize') pageSize: number = 10,
            @Query('orderBy') orderBy: string = 'id',
            @Query('order') order: string = 'ASC'): Promise<{ requests: ItemRequest[], requestCount: number}>  {
        return this.requestService.findRequests(page, pageSize, orderBy, order);
    }


    @Get(':id')
    findOne(@Param('id') id: string): Promise<ItemRequest> {
        return this.requestService.findOneRequest(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto): Promise<ItemRequest> {
        return this.requestService.updateRequest(+id, updateRequestDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.requestService.removeRequest(+id);
    }
}

