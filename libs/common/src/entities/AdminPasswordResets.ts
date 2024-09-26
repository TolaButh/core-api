import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_password_resets')
export class AdminPasswordResets {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'email', nullable: true, length: 40 })
  email: string | null;

  @Column('varchar', { name: 'token', nullable: true, length: 40 })
  token: string | null;

  @Column('tinyint', { name: 'status', width: 1, default: () => "'1'" })
  status: boolean;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;
}
