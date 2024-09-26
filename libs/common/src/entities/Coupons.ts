import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coupons')
export class Coupons {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'code', length: 191 })
  code: string;

  @Column('int', { name: 'amount', default: () => "'0'" })
  amount: number;

  @Column('int', { name: 'remaining', default: () => "'0'" })
  remaining: number;
  
  @Column('int', { name: 'total', default: () => "'0'" })
  total: number;

  @Column('tinyint', {
    name: 'status',
    comment:
      '0=Unused , 1= Used,',
    width: 1,
    default: () => "'0'",
  })
  status: number;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
