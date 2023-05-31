import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

import "reflect-metadata";

@Entity()
export default class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  desc!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
