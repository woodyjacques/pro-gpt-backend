import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class chat_gpt {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    budget: string;
    @Column()
    objetive: string;
}
