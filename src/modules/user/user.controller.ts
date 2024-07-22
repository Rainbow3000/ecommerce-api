import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { BASE_API_URL } from 'src/common/constants';

@Controller(`${BASE_API_URL}/user`)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findOne(@Param() id: number) {
    return this.userService.findOne(id);
  }
}
