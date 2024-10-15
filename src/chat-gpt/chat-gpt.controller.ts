import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { CreateChatGptDto } from './dto/create-chat-gpt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chat-gpt')
@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) { }

  @Post()
  async create(@Body() CreateChatGptDto: CreateChatGptDto) {
    const generatedDescription = await this.chatGptService.create(CreateChatGptDto);
    return { message: generatedDescription };
  }

  
  @Get(':email')
  findById(@Param('email') email: string) {
    return this.chatGptService.findAllByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.chatGptService.remove(id);
  }

}

