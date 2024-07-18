import { Column, Entity, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  image: string;

  @Column({ type: 'int', name: 'product_number', default: 0 })
  product_number: number;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
