import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Contacts {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 100 })
  name?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;
}
