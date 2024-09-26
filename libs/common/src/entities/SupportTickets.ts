import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('support_tickets')
export class SupportTickets {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('int', { name: 'user_id', nullable: true, default: () => "'0'" })
  userId: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 40 })
  email: string | null;

  @Column('varchar', { name: 'ticket', nullable: true, length: 40 })
  ticket: string | null;

  @Column('varchar', { name: 'subject', nullable: true, length: 255 })
  subject: string | null;

  @Column('tinyint', {
    name: 'status',
    comment: '0: Open, 1: Answered, 2: Replied, 3: Closed',
    width: 1,
    default: () => "'0'",
  })
  status: boolean;

  @Column('tinyint', {
    name: 'priority',
    comment: '1 = Low, 2 = medium, 3 = heigh',
    width: 1,
    default: () => "'0'",
  })
  priority: boolean;

  @Column('datetime', { name: 'last_reply', nullable: true })
  lastReply: Date | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
