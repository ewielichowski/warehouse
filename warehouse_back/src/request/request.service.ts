import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRequest } from '../item/request.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from '../item/dto/create-request.dto';
import { UpdateRequestDto } from '../item/dto/update-request.dto';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(ItemRequest)
        private readonly requestRepository: Repository<ItemRequest>,
    ) {}


}
