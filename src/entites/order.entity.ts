import { ORDER_STATUS } from 'src/enums';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { OrderDetailsEntity } from './order_details.entity';

@Entity()
export class OrderEntity extends BaseEntity {
  @Column({ type: 'int', name: 'user_id', nullable: false })
  userId: number;

  @Column({ type: 'varchar', name: 'total_money', nullable: false })
  totalMoney: string;

  @Column({ type: 'varchar', name: 'user_note' })
  userNote: string;

  @Column({ type: 'varchar', nullable: false, default: ORDER_STATUS.PENDING })
  orderStatus: ORDER_STATUS;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderDetailsEntity, (orderDetaisl) => orderDetaisl.order)
  orderDetails: OrderDetailsEntity[];
}
