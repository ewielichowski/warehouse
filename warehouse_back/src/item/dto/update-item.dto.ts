import { IsNotEmpty, IsString, IsInt, IsPositive, IsOptional, IsNumber } from 'class-validator';

export class UpdateItemDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  unitOfMeasurement: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Status must not be empty'})
  status: string;

  @IsOptional()
  storageLocation: string;

  @IsOptional()
  contactPerson: string;
}