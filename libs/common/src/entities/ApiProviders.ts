import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('api_providers')
export class ApiProviders {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: string | null;

  @Column('varchar', { name: 'short_name', nullable: true, length: 4 })
  shortName: string | null;

  @Column('varchar', { name: 'api_url', nullable: true, length: 255 })
  apiUrl: string | null;

  @Column('varchar', { name: 'api_key', nullable: true, length: 255 })
  apiKey: string | null;

  @Column('int', { name: 'rate', default: () => "'0'" })
  rate: number;

  @Column('varchar', { name: 'currency', nullable: true, length: 10 })
  currency: string | null;

  @Column('decimal', {
    name: 'balance',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  balance: number;

  @Column('tinyint', {
    name: 'status',
    comment: 'enable : 1, disable :0',
    width: 1,
    default: () => "'1'",
  })
  status: boolean;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;
}
