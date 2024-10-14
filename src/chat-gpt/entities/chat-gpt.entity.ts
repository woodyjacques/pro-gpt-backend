import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ChatGpt {
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
