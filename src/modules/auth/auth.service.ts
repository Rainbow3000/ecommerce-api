import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto } from './auth.dto';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PASSWORD_INCORRECT,
  USER_EXISTED,
  USER_NOT_FOUND,
} from 'src/common/error';
import * as bcrypt from 'bcrypt';
import { UserRoleEntity } from 'src/entities/user_role.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { ROLE } from 'src/common/enums';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async register(payload: CreateAuthDto) {
    try {
      const hashPassword = await bcrypt.hash(payload.password, 10);

      payload.password = hashPassword;

      const user = await this.userRepository.save(payload);

      const role = await this.dataSource
        .getRepository(RoleEntity)
        .findOneBy({ roleName: ROLE.USER });

      if (role) {
        await this.dataSource
          .getRepository(UserRoleEntity)
          .insert({ userId: user.id, roleId: role.id });
      }

      const { password, ...restData } = user;

      return restData;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(USER_EXISTED);
      }
    }
  }

  async login(payload: LoginAuthDto) {
    const user = await this.userRepository.findOneBy({ email: payload.email });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(PASSWORD_INCORRECT);
    }

    const subject = { userId: user.id, username: user.userName };

    const { password, ...restData } = user;

    return {
      ...restData,
      accessToken: await this.jwtService.signAsync(subject),
    };
  }
}
