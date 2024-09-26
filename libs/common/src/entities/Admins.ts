import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('email', ['email', 'username'], { unique: true })
@Entity('admins')
export class Admins {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 40 })
  email: string | null;

  @Column('varchar', { name: 'username', nullable: true, length: 40 })
  username: string | null;

  @Column('timestamp', { name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date | null;

  @Column('varchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('varchar', { name: 'remember_token', nullable: true, length: 255 })
  rememberToken: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
