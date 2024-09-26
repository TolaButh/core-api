import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_hash_coupons')
export class UserHashCoupons {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true, default: () => "'0'" })
  userId: number;

  @Column('int', { name: 'coupon_id', unsigned: true, default: () => "'0'" })
  couponId: number;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}