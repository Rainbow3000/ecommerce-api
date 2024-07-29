import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BASE_API_URL } from 'src/common/constants';
import { ChatService } from './chat.service';
import { CreateChatDto, GetListChatDto, UpdateChatDto } from './chat.dto';

@Controller(`${BASE_API_URL}/chat`)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  list(@Query() query: GetListChatDto) {
    return this.chatService.list(query);
  }

  @Post()
  create(@Body() payload: CreateChatDto) {
    return this.chatService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateChatDto) {
    return this.chatService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.chatService.delete(id);
  }
}
