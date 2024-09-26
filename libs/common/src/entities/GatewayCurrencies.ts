import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gateway_currencies')
export class GatewayCurrencies {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: string | null;

  @Column('varchar', { name: 'currency', nullable: true, length: 40 })
  currency: string | null;

  @Column('varchar', { name: 'symbol', nullable: true, length: 40 })
  symbol: string | null;

  @Column('int', { name: 'method_code', nullable: true })
  method_code: number | null;

  @Column('varchar', { name: 'gateway_alias', nullable: true, length: 40 })
  gatewayAlias: string | null;

  @Column('decimal', {
    name: 'min_amount',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  minAmount: number;

  @Column('decimal', {
    name: 'max_amount',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  maxAmount: number;

  @Column('decimal', {
    name: 'percent_charge',
    precision: 5,
    scale: 2,
    default: () => "'0.00'",
  })
  percentCharge: number;

  @Column('decimal', {
    name: 'fixed_charge',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  fixedCharge: number;

  @Column('decimal', {
    name: 'rate',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  rate: number;


  @Column('varchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('text', { name: 'gateway_parameter', nullable: true })
  gatewayParameter: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
