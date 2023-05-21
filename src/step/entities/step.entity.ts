import { Process } from 'src/process/entities/process.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('step')
export class Step {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  process_id: number;

  @Column()
  name: string;

  @Column()
  observation: string;

  @ManyToOne(() => Process)
  @JoinColumn({ name: 'id_processo' })
  process: Process;
}
