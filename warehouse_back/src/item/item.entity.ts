import { ItemRequest } from 'src/item/request.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum UnitOfMeasurement {
  CM = "cm",
  PCS = "pcs.",
  KG = "kg",
}

@Entity('items')
export class Item {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'name', length: 70, nullable: false })
    name: string;
  
    // @Column({ type: "enum", enum: UnitOfMeasurement, name: 'unitOfMeasurement',  nullable: false })
    // unitOfMeasurement: UnitOfMeasurement;
  
    @Column({ name: 'unitOfMeasurement', length: 20, nullable: false })
    unitOfMeasurement: string;

    @Column({ name: 'quantity', type: 'float', nullable: false })
    quantity: number;
  
    @Column({name: 'price', nullable: false})
    price: number;
  
    @Column({ name: 'status', length: 140, nullable: false })
    status: string;
  

    @Column({ name: 'storageLocation', length: 140, nullable: true })
    storageLocation: string;
 
    @Column({ name: 'contactPerson', length: 420, nullable: true })
    contactPerson: string;

    @OneToMany(() => ItemRequest, itemRequest => itemRequest.item)
    itemRequests: ItemRequest[];
  }

  /*
1. Item ID (non-editable) yes Unique record identifier
2. Item Group Selection yes Single choice from the “Item Group” list
3. Unit of measurement Selection yes Single choice from the “Unit of measurement” list
4. Quantity Digit yes
5. Price without VAT (UAH) Digit yes
6. Status Text yes One-line field
7. Storage location Text no One-line field
8. Contact person Text no Multiline field
9. Photo – (*) Files no Item photo*/