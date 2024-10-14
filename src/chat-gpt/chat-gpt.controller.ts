import { Controller, Post, Body } from '@nestjs/common';
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

}

