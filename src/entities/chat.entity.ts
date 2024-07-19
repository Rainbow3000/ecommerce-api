import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity()
export class ChatEntity extends BaseEntity {
  @Column({ type: 'int', name: 'from_id', nullable: false })
  fromId: number;

  @Column({ type: 'int', name: 'to_id', nullable: false })
  toId: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'text' })
  image: string;

  @ManyToOne(() => UserEntity, (user) => user.chats)
  @JoinColumn({ name: 'fromId' })
  user: UserEntity;
}
