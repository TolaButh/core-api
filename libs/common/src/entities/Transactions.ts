import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true, default: () => "'0'" })
  userId: number;

  @Column('decimal', {
    name: 'amount',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  amount: number;

  @Column('decimal', {
    name: 'charge',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  charge: number;

  @Column('decimal', {
    name: 'post_balance',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  postBalance: number;

  @Column('varchar', { name: 'trx_type', nullable: true, length: 40 })
  trxType: string | null;

  @Column('varchar', { name: 'trx', nullable: true, length: 40 })
  trx: string | null;

  @Column('varchar', { name: 'details', nullable: true, length: 255 })
  details: string | null;

  @Column('varchar', { name: 'remark', nullable: true, length: 40 })
  remark: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
