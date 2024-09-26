import { Column, Entity } from 'typeorm';

@Entity('password_resets')
export class PasswordResets {
  @Column('varchar', { name: 'email', nullable: true, length: 40 })
  email: string | null;

  @Column('varchar', { name: 'token', nullable: true, length: 40 })
  token: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;
}
