import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('frontends')
export class Frontends {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'data_keys', nullable: true, length: 40 })
  dataKeys: string | null;

  @Column('longtext', { name: 'data_values', nullable: true })
  dataValues: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
