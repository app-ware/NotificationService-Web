import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassAgenda } from "./ClassAgenda";
import { Weekdays } from "./Weekdays";

@Index("PK__ClassAge__C38E92075FA17E1A", ["agendaItemId"], { unique: true })
@Entity("ClassAgenda_Items", { schema: "dbo" })
export class ClassAgendaItems {
  @PrimaryGeneratedColumn({ type: "int", name: "agenda_item_id" })
  agendaItemId: number;

  @Column("nvarchar", { name: "agenda_item_time", nullable: true, length: 100 })
  agendaItemTime: string | null;

  @Column("int", { name: "subject_id", nullable: true })
  subjectId: number | null;

  @ManyToOne(() => ClassAgenda, (classAgenda) => classAgenda.classAgendaItems)
  @JoinColumn([{ name: "agenda_id", referencedColumnName: "agendaId" }])
  agenda: ClassAgenda;

  @ManyToOne(() => Weekdays, (weekdays) => weekdays.classAgendaItems)
  @JoinColumn([{ name: "weekday_id", referencedColumnName: "weekdayId" }])
  weekday: Weekdays;
}
