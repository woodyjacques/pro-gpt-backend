import { ApiProperty } from '@nestjs/swagger';

export class CreateChatGptDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    budget:string;
    @ApiProperty()
    objetive:string;
}

