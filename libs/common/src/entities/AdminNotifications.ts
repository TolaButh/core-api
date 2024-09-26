import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_notifications')
export class AdminNotifications {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('int', { name: 'user_id', unsigned: true, default: () => "'0'" })
  userId: number;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('tinyint', { name: 'is_read', width: 1, default: () => "'0'" })
  isRead: boolean;

  @Column('text', { name: 'click_url', nullable: true })
  clickUrl: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
