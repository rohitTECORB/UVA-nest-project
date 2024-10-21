import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coludinary')
export class UploadFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public_id: string;

  @Column()
  url: string;

  @Column()
  secure_url: string;

  @Column()
  folder: string;
}
