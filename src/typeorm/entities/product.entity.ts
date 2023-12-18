import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ nullable: false })
  productname: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  brand: string;

  @Column({ type: 'numeric', precision: 9, scale: 2 })
  price: number;

  @Column({ type: 'numeric', precision: 4, scale: 0, default: 100 })
  stock: number;
  
  @Column({ type: 'numeric', precision: 3, scale: 2, default: -1 })
  reviewScore: number;
}