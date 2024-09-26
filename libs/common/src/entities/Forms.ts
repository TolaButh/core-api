import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('forms')
export class Forms {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'act', nullable: true, length: 40 })
  act: string | null;

  @Column('text', { name: 'form_data', nullable: true })
  formData: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
