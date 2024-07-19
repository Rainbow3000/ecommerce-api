import { COMMON_STATUS } from 'src/enums';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_id' })
  createdId: number;

  @Column({ name: 'deleted_id' })
  deletedId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: 'varchar', default: COMMON_STATUS.ACTIVE })
  status: COMMON_STATUS.ACTIVE;

  @ManyToOne(() => UserEntity, (user) => user.id)
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  deletedBy: UserEntity;
}
