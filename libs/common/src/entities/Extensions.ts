import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('extensions')
export class Extensions {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'act', nullable: true, length: 40 })
  act: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('varchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('text', { name: 'script', nullable: true })
  script: string | null;

  @Column('text', { name: 'shortcode', nullable: true, comment: 'object' })
  shortcode: string | null;

  @Column('text', { name: 'support', nullable: true, comment: 'help section' })
  support: string | null;

  @Column('tinyint', {
    name: 'status',
    comment: '1=>enable, 2=>disable',
    width: 1,
    default: () => "'1'",
  })
  status: boolean;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
