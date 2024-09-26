import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('languages')
export class Languages {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: string | null;

  @Column('varchar', { name: 'code', nullable: true, length: 40 })
  code: string | null;

  @Column('tinyint', {
    name: 'is_default',
    comment: '0: not default language, 1: default language',
    width: 1,
    default: () => "'0'",
  })
  isDefault: boolean;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
