import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('rank')
export class Rank {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string | null;

  @Column('decimal', {
    name: 'deposit_total',
    precision: 28,
    scale: 8,
    default: () => "'0.00'",
  })
  depositTotal: number;

  @Column('decimal', {
    name: 'reward',
    precision: 28,
    scale: 8,
    default: () => "'0.00'",
  })
  reward: number;

  @Column('decimal', {
    name: 'discount',
    precision: 28,
    scale: 8,
    default: () => "'0.00'",
  })
  discount: number;

  @CreateDateColumn()
  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @UpdateDateColumn()
  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;
}
