import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('bonuses')
export class Bonuses {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;
  
  @Column('decimal',{ name: 'amount',
  precision: 28,
  scale: 8,
  default: () => "'0.00000000'",})
  amount: number;

  @Column('int', { name: 'percent', default: () => "'0'" })
  percent: number;
  
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   updated_at: Date;
}
