import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/constants';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);