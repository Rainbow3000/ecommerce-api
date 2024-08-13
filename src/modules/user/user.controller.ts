import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { BASE_API_URL } from 'src/common/constants';
import { GetUserListDto } from './user.dto';

@Controller(`${BASE_API_URL}/user`)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  list(@Query() query: GetUserListDto) {
    return this.userService.getListUser(query);
  }
}
