import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { HotelEntity } from './hotel.entity';

@Entity({name: 'employer'})
export class EmployerEntity {
  @PrimaryColumn()
  uid!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column()
  role!: string;

  @Column({default: 0})
  totalScore!: number;

  @Column({default: 0})
  totalServices!: number;

  @Column({default: 0, type: 'numeric'})
  totalTime!: number;

  @ManyToOne(type => HotelEntity, hotel => hotel.employees)
  hotel!: HotelEntity
}
