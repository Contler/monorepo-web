import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { EmployerEntity } from './employer.entity';

@Entity({ name: 'hotel' })
export class HotelEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  uid!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  color!: string;

  @Column()
  logo!: string;

  @OneToMany(type => EmployerEntity, employer => employer.hotel)
  employees!: EmployerEntity[];

  // @OneToMany(type => ZoneEntity, zone => zone.hotel)
  // zones!: ZoneEntity[];
}
