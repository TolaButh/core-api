import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'type' })
  type: number;

  @Column('varchar', { name: 'title', length: '191' })
  title: string;

  @Column('text', { name: 'detail' })
  detail: string;

  @Column('tinyint', {
    name: 'status',
    comment: '1=Open, 0=Close',
    width: 1,
    default: () => "'1'",
  })
  status: number;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
