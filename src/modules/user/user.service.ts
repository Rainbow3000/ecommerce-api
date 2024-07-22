import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_NOT_FOUND } from 'src/common/error';
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
        userRoles: true,
      },
    });

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }
}
