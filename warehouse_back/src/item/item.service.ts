
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.entity';
import { ItemRequest } from './request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Console } from 'console';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(ItemRequest)
    private readonly requestRepository: Repository<ItemRequest>,
  ) {}

  async findAllItems(): Promise<Item[]> {
    return await this.itemRepository.find();
  }
  
  async findItems(page: number, pageSize: number, orderBy: string, order: string):
  Promise<{ items: Item[], itemCount: number}> {
    
    
    const [items, itemCount] = await this.itemRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        [orderBy]: order
      }
    })
    
    return {items: items, itemCount: itemCount};
  }

  async findOneItem(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id: id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return (item);
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return await this.itemRepository.save(item);
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOneItem(id);
    Object.assign(item, updateItemDto);
    return await this.itemRepository.save(item);
  }

  async removeItem(id: number) {

    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item "${id}" was not found`);
    }
    return { message: 'Item successfully deleted' };
  }


  // REQUEST

  async findRequests(page: number, pageSize: number, orderBy: string, order: string):
  Promise<{ requests: ItemRequest[], requestCount: number}> {
    
    
    const [requests, requestCount] = await this.requestRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        [orderBy]: order
      },
      relations: {
        item: true
      } 
    })
    
    return {requests: requests, requestCount: requestCount};
  }

  async findOneRequest(id: number): Promise<ItemRequest> {
    const request = await this.requestRepository.findOne({ 
      where: { id: id },
      relations: {
        item: true
      } });
    if (!request) {
      throw new NotFoundException(`ItemRequest with ID ${id} not found`);
    }
    return (request);
  }


  async createRequest(createRequestPayload): Promise<ItemRequest> {
    const item = await this.findOneItem(createRequestPayload.itemId);

    const request = this.requestRepository.create({
      employeeName: createRequestPayload.employeeName,
      quantity: createRequestPayload.quantity,
      comment: createRequestPayload.comment,
      unitOfMeasurement: item.unitOfMeasurement,
      price: item.price,
      status: 'new',
      item: item
    });

    return await this.requestRepository.save(request);
  }

  async updateRequest(id: number, updateRequestDto: UpdateRequestDto): Promise<ItemRequest> {
    const request = await this.findOneRequest(id);
    const item = request.item;

    if(request.status != 'new') {
      throw new BadRequestException('Request already updated!');
    }

    if(updateRequestDto.status == 'confirmed') {
      
      if(request.quantity <= item.quantity) {
        Object.assign(item, {
          quantity: item.quantity - request.quantity 
        });
        Object.assign(request, updateRequestDto)

        this.itemRepository.save(item);    
        return await this.requestRepository.save(request);

      } else {
        throw new Error(`Not enough of item ${item.name} in stock`);
      } 
    }
    else if (updateRequestDto.status == 'rejected') {  
      Object.assign(request, updateRequestDto);
      return await this.requestRepository.save(request);
    }
    else {
      throw new BadRequestException('Invalid request status');
    }

    // Object.assign(request, updateRequestDto);
    
    
    // return await this.requestRepository.save(request);
  }

  async removeRequest(id: number) {

    const result = await this.requestRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ItemRequest "${id}" was not found`);
    }
    return { message: 'Request successfully deleted' };
  }

}
