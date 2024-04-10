import { IsNotEmpty, IsString, IsInt, IsPositive, IsOptional, IsNumber, isString } from 'class-validator';
import { Item } from '../item.entity';

export class CreateRequestDto {
  @IsNotEmpty({ message: 'Field Employee Name must be added' })
  @IsString()
  employeeName: string;

  @IsNotEmpty({ message: 'select item' })
  item: Item;

  @IsNumber()
  itemId: number;

  @IsNotEmpty({ message: 'unit of measurememnt must not be empty' })
  @IsString()
  unitOfMeasurement: string;
  
  @IsNotEmpty({ message: 'provide quantity' })
  @IsNumber()
  quantity: number;

  @IsNotEmpty({ message: 'Price must be added' })
  @IsNumber()
  @IsPositive()
  price: number;
  
  @IsOptional()
  comment: string;

  @IsString()
  status: string;
}