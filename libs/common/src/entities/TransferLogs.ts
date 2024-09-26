import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transfer_logs')
export class TransferLogs {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true, default: () => "'0'" })
  userId: number;

  @Column('int', { name: 'amount', default: () => "'0'" })
  amount: number;

  @Column('tinyint', {
    name: 'status',
    comment:
      '0= Pending, 1= Processing, 2= Completed, 3 = Cancelled, 4 = Refunded',
    width: 1,
    default: () => "'0'",
  })
  status: number;

  @Column('varchar', { name: 'details', nullable: true, length: 255 })
  details: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
