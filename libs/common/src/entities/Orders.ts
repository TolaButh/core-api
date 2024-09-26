import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProviders } from './ApiProviders';

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true, default: () => "'0'" })
  userId: number;

  @Column('int', { name: 'category_id', unsigned: true, default: () => "'0'" })
  categoryId: number;

  @Column('int', { name: 'service_id', unsigned: true, default: () => "'0'" })
  serviceId: number;

  @Column('int', {
    name: 'api_service_id',
    unsigned: true,
    default: () => "'0'",
  })
  apiServiceId: number | null;

  @Column('varchar', { name: 'link', nullable: true, length: 255 })
  link: string | null;

  @Column('text', { name: 'add_on', nullable: true })
  addOn: string | null;

  @Column('decimal', {
    name: 'cost',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  cost: number;

  @Column('int', {
    name: 'api_provider_id',
    unsigned: true,
    default: () => "'0'",
  })
  apiProviderId: number | null;

  @Column('int', { name: 'quantity', default: () => "'0'" })
  quantity: number;

  @Column('decimal', {
    name: 'price',
    precision: 28,
    scale: 8,
    default: () => "'0.00000000'",
  })
  price: number;

  @Column('tinyint', {
    name: 'type',
    comment:
      '1= General,2= Comment',
    width: 1,
    default: () => "'1'",
  })
  type: number;

  @Column('int', { name: 'rate', default: () => "'0'" })
  rate: number;

  @Column('bigint', { name: 'start_counter', default: () => "'0'" })
  startCounter: number;

  @Column('bigint', { name: 'remain', default: () => "'0'" })
  remain: number;

  @Column('int', { name: 'runs', default: () => "'0'" })
  runs: number;

  @Column('int', { name: 'interval', default: () => "'0'" })
  interval: number;

  @Column('tinyint', {
    name: 'status',
    comment:
      '0= Pending, 1= Processing, 2= Completed, 3 = Cancelled, 4 = Refunded',
    width: 1,
    default: () => "'0'",
  })
  status: number;

  @Column('tinyint', { name: 'api_order', width: 1, default: () => "'0'" })
  apiOrder: number;

  @Column('bigint', { name: 'api_order_id', default: () => "'0'" })
  apiOrderId: number;

  @Column('tinyint', {
    name: 'order_placed_to_api',
    width: 1,
    default: () => "'0'",
  })
  orderPlacedToApi: number;

  @Column('varchar', { name: 'remark', nullable: true, length: 255 })
  remark: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
