import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity('order_details')
export class OrderDetailsEntity extends BaseEntity {
  @Column({ type: 'int', name: 'order_id', nullable: false })
  orderId: number;

  @Column({ type: 'int', name: 'product_id', nullable: false })
  productId: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;
}
