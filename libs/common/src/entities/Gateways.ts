import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gateways')
export class Gateways {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('int', { name: 'form_id', unsigned: true, default: () => "'0'" })
  formId: number;

  @Column('int', { name: 'code', nullable: true })
  code: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: string | null;

  @Column('varchar', { name: 'alias', length: 40 })
  alias: string;

  @Column('tinyint', {
    name: 'status',
    comment: '1=>enable, 2=>disable',
    width: 1,
    default: () => "'1'",
  })
  status: boolean;

  @Column('text', { name: 'gateway_parameters', nullable: true })
  gatewayParameters: string | null;

  @Column('text', { name: 'supported_currencies', nullable: true })
  supportedCurrencies: string | null;

  @Column('tinyint', {
    name: 'crypto',
    comment: '0: fiat currency, 1: crypto currency',
    width: 1,
    default: () => "'0'",
  })
  crypto: boolean;

  @Column('text', { name: 'extra', nullable: true })
  extra: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
