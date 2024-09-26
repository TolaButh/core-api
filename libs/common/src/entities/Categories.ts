import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('name', ['name'], { unique: true })
@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    unique: true,
    length: 255,
  })
  name: string | null;
  
  @Column('tinyint', {
    name: 'type',
    comment:
      '1= General,2= Comment',
    width: 1,
    default: () => "'1'",
  })
  type: number;

  @Column('int', { name: 'platform_id', default: () => "0" })
  platformId: number;

  @Column('tinyint', { name: 'status', width: 1, default: () => "'1'" })
  status: boolean;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
