import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_logins')
export class UserLogins {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('int', { name: 'user_id', unsigned: true, default: () => "'0'" })
  userId: number;

  @Column('varchar', { name: 'user_ip', nullable: true, length: 40 })
  userIp: string | null;

  @Column('varchar', { name: 'city', nullable: true, length: 40 })
  city: string | null;

  @Column('varchar', { name: 'country', nullable: true, length: 40 })
  country: string | null;

  @Column('varchar', { name: 'country_code', nullable: true, length: 40 })
  countryCode: string | null;

  @Column('varchar', { name: 'longitude', nullable: true, length: 40 })
  longitude: string | null;

  @Column('varchar', { name: 'latitude', nullable: true, length: 40 })
  latitude: string | null;

  @Column('varchar', { name: 'browser', nullable: true, length: 40 })
  browser: string | null;

  @Column('varchar', { name: 'os', nullable: true, length: 40 })
  os: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
