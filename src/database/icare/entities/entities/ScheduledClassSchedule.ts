import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Weekdays } from "./Weekdays";
import { ClassSchedule } from "./ClassSchedule";

@Index("PK__Schedule__E839C5B3743D0205", ["scheduledClassScheduleId"], {
  unique: true,
})
@Entity("Scheduled_ClassSchedule", { schema: "dbo" })
export class ScheduledClassSchedule {
  @PrimaryGeneratedColumn({ type: "int", name: "scheduled_classSchedule_id" })
  scheduledClassScheduleId: number;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @ManyToOne(() => Weekdays, (weekdays) => weekdays.scheduledClassSchedules)
  @JoinColumn([{ name: "weekday_id", referencedColumnName: "weekdayId" }])
  weekday: Weekdays;

  @ManyToOne(
    () => ClassSchedule,
    (classSchedule) => classSchedule.scheduledClassSchedules
  )
  @JoinColumn([
    { name: "class_schedule_id", referencedColumnName: "classScheduleId" },
  ])
  classSchedule: ClassSchedule;
}
