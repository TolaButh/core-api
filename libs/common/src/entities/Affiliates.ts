import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('affiliates')
export class Affiliates {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'parent_id', unsigned: true, default: () => "'0'" })
  parentId: number;

  @Column('int', { name: 'child_id', unsigned: true, default: () => "'0'" })
  childId: number;
  
  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

}