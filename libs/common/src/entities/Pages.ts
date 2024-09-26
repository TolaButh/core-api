import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pages')
export class Pages {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: string | null;

  @Column('varchar', { name: 'slug', nullable: true, length: 40 })
  slug: string | null;

  @Column('varchar', {
    name: 'tempname',
    nullable: true,
    comment: 'template name',
    length: 40,
  })
  tempname: string | null;

  @Column('text', { name: 'secs', nullable: true })
  secs: string | null;

  @Column('tinyint', { name: 'is_default', width: 1, default: () => "'0'" })
  isDefault: boolean;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
