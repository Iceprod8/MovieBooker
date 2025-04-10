import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Reservation } from '../../reservation/entity/reservation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Reservation, (reservation) => reservation.user)
  reservation: Reservation[];
}
