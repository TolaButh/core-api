import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { GatewayCurrencies } from './GatewayCurrencies';
import { Gateways } from './Gateways';

@Entity('deposits')
export class Deposits {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true, default: () => "'0'" })
  userId: number;

  @Column('int', { name: 'method_code', unsigned: true, default: () => "'0'" })
  methodCode: number;

  @Column('decimal', {
    name: 'amount',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  amount: number;

  @ManyToOne(type => GatewayCurrencies, currency => currency.method_code)
  @JoinColumn({ name: "method_code", referencedColumnName: "method_code" })
  gatewayCurrency: GatewayCurrencies;


  @Column('varchar', { name: 'method_currency', nullable: true, length: 40 })
  methodCurrency: string | null;

  @Column('decimal', {
    name: 'charge',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  charge: number;

  @Column('decimal', {
    name: 'rate',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  rate: number;

  @Column('decimal', {
    name: 'final_amo',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  finalAmo: number;

  @Column('text', { name: 'detail', nullable: true })
  detail: string | null;

  @Column('varchar', { name: 'btc_amo', nullable: true, length: 255 })
  btcAmo: number | null;

  @Column('varchar', { name: 'btc_wallet', nullable: true, length: 255 })
  btcWallet: string | null;

  @Column('varchar', { name: 'trx', nullable: true, length: 40 })
  trx: string | null;

  @Column('int', { name: 'try', default: () => "'0'" })
  try: number;

  @Column('tinyint', {
    name: 'status',
    comment: '1=>success, 2=>pending, 3=>cancel',
    width: 1,
    default: () => "'0'",
  })
  status: number;

  @Column('tinyint', { name: 'from_api', width: 1, default: () => "'0'" })
  fromApi: boolean;

  @Column('varchar', { name: 'admin_feedback', nullable: true, length: 255 })
  adminFeedback: string | null;

  @CreateDateColumn()
  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @UpdateDateColumn()
  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;
}
