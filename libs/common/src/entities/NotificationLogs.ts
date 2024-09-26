import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification_logs')
export class NotificationLogs {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('int', { name: 'user_id', unsigned: true, default: () => "'0'" })
  userId: number;

  @Column('varchar', { name: 'sender', nullable: true, length: 40 })
  sender: string | null;

  @Column('varchar', { name: 'sent_from', nullable: true, length: 40 })
  sentFrom: string | null;

  @Column('varchar', { name: 'sent_to', nullable: true, length: 40 })
  sentTo: string | null;

  @Column('varchar', { name: 'subject', nullable: true, length: 255 })
  subject: string | null;

  @Column('text', { name: 'message', nullable: true })
  message: string | null;

  @Column('varchar', { name: 'notification_type', nullable: true, length: 40 })
  notificationType: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
