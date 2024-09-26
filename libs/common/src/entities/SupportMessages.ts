import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('support_messages')
export class SupportMessages {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('int', {
    name: 'support_ticket_id',
    unsigned: true,
    default: () => "'0'",
  })
  supportTicketId: number;

  @Column('int', { name: 'admin_id', unsigned: true, default: () => "'0'" })
  adminId: number;

  @Column('longtext', { name: 'message', nullable: true })
  message: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
