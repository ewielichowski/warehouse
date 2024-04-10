import { IsNotEmpty, IsString, IsInt, IsPositive, IsOptional, IsNumber, isString } from 'class-validator';
import { Item } from '../item.entity';

export class UpdateRequestDto {
  @IsString()
  status: string;

  @IsString()
  comment: string;
}