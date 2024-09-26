import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification_templates')
export class NotificationTemplates {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'act', nullable: true, length: 40 })
  act: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: string | null;

  @Column('varchar', { name: 'subj', nullable: true, length: 255 })
  subj: string | null;

  @Column('text', { name: 'email_body', nullable: true })
  emailBody: string | null;

  @Column('text', { name: 'sms_body', nullable: true })
  smsBody: string | null;

  @Column('text', { name: 'shortcodes', nullable: true })
  shortcodes: string | null;

  @Column('tinyint', { name: 'email_status', width: 1, default: () => "'1'" })
  emailStatus: boolean;

  @Column('tinyint', { name: 'sms_status', width: 1, default: () => "'1'" })
  smsStatus: boolean;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
