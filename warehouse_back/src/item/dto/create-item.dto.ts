import { IsNotEmpty, IsString, IsInt, IsPositive, IsOptional, IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'unit of measurememnt mustt not be empty' })
  @IsString()
  unitOfMeasurement: string;

  @IsNotEmpty({ message: 'provide quantity' })
  @IsNumber()
  quantity: number;

  @IsNotEmpty({ message: 'Price must be added' })
  @IsInt({ message: 'Price must be of type number' })
  @IsPositive()
  price: number;

  @IsNotEmpty({ message: 'Status must not be empty'})
  status: string;

  @IsOptional()
  storageLocation: string;

  @IsOptional()
  contactPerson: string;
}