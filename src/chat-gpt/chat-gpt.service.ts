import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateChatGptDto } from './dto/create-chat-gpt.dto';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatGpt } from './entities/chat-gpt.entity';
import 'dotenv/config';

@Injectable()
export class ChatGptService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(ChatGpt) private readonly chatRepository: Repository<ChatGpt>,
  ) {}

  async create(createChatDto: CreateChatGptDto): Promise<string> {
    const { email, name, description, budget, objetive } = createChatDto;

    const prompt = `
      Quiero que actúes como un asistente especializado en la creación de propuestas de negocios. 
      Con los siguientes datos: 
      - Nombre del proyecto: ${name}
      - Descripción: ${description}
      - Presupuesto: ${budget}
      - Objetivo: ${objetive}
      
      Con esta información, genera una propuesta de negocio profesional que incluya una introducción, una descripción detallada del proyecto, el presupuesto detallado y los objetivos específicos. 
    `;

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo', 
            messages: [
              { role: 'system', content: "Actúa como un asistente especializado en la creación de propuestas de negocios." },
              { role: 'user', content: prompt },
            ],
            max_tokens: 1500,
            temperature: 0.7, 
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.OPENAI_API_TOKEN}`
          }
          },
        ),
      );

      const generatedDescription = response.data.choices[0].message.content.trim();

      const newChat = this.chatRepository.create({
        email,
        name,
        description: generatedDescription, 
        budget,
        objetive,
      });
      await this.chatRepository.save(newChat);

      return generatedDescription;

    } catch (error) {
      if (error.response) {
        console.error('Error al conectar con la API de ChatGPT:', error.response.data);
      } else {
        console.error('Error de conexión con la API de ChatGPT:', error.message);
      }
      throw new Error('No se pudo generar la propuesta de negocio en este momento.');
    }
  }
}
