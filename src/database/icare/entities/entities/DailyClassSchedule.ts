import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassSchedule } from "./ClassSchedule";
import { Weekdays } from "./Weekdays";

@Index("PK__Daily_Cl__1ADCA943642F8808", ["dailyClassScheduleId"], {
  unique: true,
})
@Entity("Daily_ClassSchedule", { schema: "dbo" })
export class DailyClassSchedule {
  @PrimaryGeneratedColumn({ type: "int", name: "daily_classSchedule_id" })
  dailyClassScheduleId: number;

  @ManyToOne(
    () => ClassSchedule,
    (classSchedule) => classSchedule.dailyClassSchedules
  )
  @JoinColumn([
    { name: "class_schedule_id", referencedColumnName: "classScheduleId" },
  ])
  classSchedule: ClassSchedule;

  @ManyToOne(() => Weekdays, (weekdays) => weekdays.dailyClassSchedules)
  @JoinColumn([{ name: "weekday_id", referencedColumnName: "weekdayId" }])
  weekday: Weekdays;
}
