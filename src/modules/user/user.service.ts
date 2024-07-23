import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_NOT_FOUND } from 'src/common/error';
import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserRoleEntity } from 'src/entities/user_role.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        userRoles: {
          role: true,
        },
      },
      select: {
        id: true,
        email: true,
        userName: true,
        userRoles: {
          roleId: true,
          role: {
            roleName: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }

  async getRoleUser(userId: number) {
    const user = await this.dataSource.getRepository(UserRoleEntity).find({
      where: {
        userId,
      },
      relations: ['role'],
      select: {
        role: {
          roleName: true,
        },
      },
    });

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const roles = user.map((item) => item.role.roleName);

    return roles;
  }
}
