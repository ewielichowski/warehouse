import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from 'src/item/item.entity';

@Entity('requests')
export class ItemRequest {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'employeeName', length: 70, nullable: false })
    employeeName: string;

    @ManyToOne(() => Item)
    @JoinColumn()
    item: Item;
  
    @Column({ name: 'unitOfMeasurement', length: 20, nullable: false })
    unitOfMeasurement: string;

    @Column({ name: 'quantity', type: 'float', nullable: false })
    quantity: number;
  
    @Column({name: 'price', nullable: false})
    price: number;
  
    @Column({ name: 'comment', length: 420, nullable: true })
    comment: string;
  
    @Column({ name: 'status', length: 140, nullable: true })
    status: string;
  }

  /*
1. Request ID (non-editable) yes Unique record identifier
2. Employee name Text yes
3. Item ID yes Single choice from the “Items” list
4. Unit of measurement Selection yes Single choice from the “Unit of measurement” list
5. Quantity Digit yes
6. Price without VAT (UAH) Digit yes
7. Comment Text no Multiline field
8. Status – (*) Selection no Single choice from the “Status” list. Is
updated upon clicking Approve/Reject
Request. The default value is New.

9. Request Row ID (non-
editable) – (***)

yes Unique record identifier. Used as a key
extension for the request entity.
Must be implemented in case of creating
several rows associated with one request. */