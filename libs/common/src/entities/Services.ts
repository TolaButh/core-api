import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './Categories';

@Entity('services')
export class Services {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @ManyToOne((type) => Categories)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Categories;

  @Column('int', { name: 'category_id', unsigned: true, default: () => "'0'" })
  categoryId: number;

  @Column('varchar', { name: 'name', nullable: true, length: 191 })
  name: string | null;

  @Column('decimal', {
    name: 'price_per_k',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  pricePerK: number;

  @Column('decimal', {
    name: 'cost',
    precision: 28,
    scale: 8,
    default: "0.000000"
  })
  cost: number;

  @Column('text', { name: 'remark', nullable: true })
  remark: string | null;

  @Column('varchar', { name: 'type', nullable: true,length: 191 })
  type: string | null;

  @Column('boolean', { name: 'drip_feed', default: () => "'false'" })
  dripFeed: boolean;

  @Column('boolean', { name: 'refill', default: () => "'false'" })
  refill: boolean;

  @Column('boolean', { name: 'cancel', default: () => "'false'" })
  cancel: boolean;

  @Column('bigint', { name: 'min', default: () => "'0'" })
  min: number;

  @Column('bigint', { name: 'max', default: () => "'0'" })
  max: number;

  @Column('text', { name: 'details', nullable: true })
  details: string | null;

  @Column('int', { name: 'api_service_id', nullable: true, unsigned: true })
  apiServiceId: number | null;

  @Column('int', {
    name: 'api_provider_id',
    unsigned: true,
    default: () => "'0'",
  })
  apiProviderId: number;

  @Column('tinyint', { name: 'status', width: 1, default: () => "'1'" })
  status: number;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
