import { Process } from 'src/process/entities/process.entity';
import { Step } from 'src/step/entities/step.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('activity')
export class Activity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  process_id: number;

  @ManyToOne(() => Process)
  @JoinColumn({ name: 'process_id' })
  process: Process;

  @Column()
  step_id: number;

  @ManyToOne(() => Step)
  @JoinColumn({ name: 'step_id' })
  step: Step;

  @Column()
  name: string;

  @Column()
  item: string;

  @Column()
  valor: string;

  @Column()
  ordem: string;

  @Column()
  espacial: string;

  @Column()
  temporal: string;

  @Column()
  dinamica: string;

  @Column()
  plastica: string;

  @Column()
  cumulatividade: string;

  @Column()
  magnitude: string;

  @Column()
  significancia: string;

  @Column()
  sensibilidade: string;

  @Column()
  condicoes: string;

  @Column()
  resistencia: string;
}
