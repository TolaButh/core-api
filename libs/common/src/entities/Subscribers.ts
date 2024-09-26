import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscribers')
export class Subscribers {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'email', nullable: true, length: 40 })
  email: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
