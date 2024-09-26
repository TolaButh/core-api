import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('support_attachments')
export class SupportAttachments {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('int', { name: 'support_message_id', nullable: true, unsigned: true })
  supportMessageId: number | null;

  @Column('varchar', { name: 'attachment', nullable: true, length: 255 })
  attachment: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
