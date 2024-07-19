import { ROLE } from 'src/enums';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoleEntity } from './user_role.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class RoleEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'role_name',
    nullable: false,
    unique: true,
  })
  roleName: ROLE;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  userRoles: UserRoleEntity[];
}
