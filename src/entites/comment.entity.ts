import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class CommentEntity extends BaseEntity {
  @Column({ type: 'int', name: 'product_id', nullable: false })
  productId: number;

  @Column({ type: 'int', name: 'user_id', nullable: false })
  userId: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'text' })
  image: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.comments)
  product: ProductEntity;
}
