import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassScheduleClasses } from "./ClassScheduleClasses";
import { DailyClassSchedule } from "./DailyClassSchedule";
import { ScheduledClassSchedule } from "./ScheduledClassSchedule";

@Index("PK__ClassSchedule__26D0CA4199F7CB45", ["classScheduleId"], {
  unique: true,
})
@Entity("ClassSchedule", { schema: "dbo" })
export class ClassSchedule {
  @PrimaryGeneratedColumn({ type: "int", name: "class_schedule_id" })
  classScheduleId: number;

  @Column("nvarchar", { name: "schedule_name", nullable: true })
  scheduleName: string | null;

  @Column("int", { name: "occurs_every", nullable: true })
  occursEvery: number | null;

  @Column("int", { name: "Interval", nullable: true })
  interval: number | null;

  @Column("int", { name: "classSchedule_type", nullable: true })
  classScheduleType: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @Column("datetime", { name: "modified_date", nullable: true })
  modifiedDate: Date | null;

  @OneToMany(
    () => ClassScheduleClasses,
    (classScheduleClasses) => classScheduleClasses.classSchedule
  )
  classScheduleClasses: ClassScheduleClasses[];

  @OneToMany(
    () => DailyClassSchedule,
    (dailyClassSchedule) => dailyClassSchedule.classSchedule
  )
  dailyClassSchedules: DailyClassSchedule[];

  @OneToMany(
    () => ScheduledClassSchedule,
    (scheduledClassSchedule) => scheduledClassSchedule.classSchedule
  )
  scheduledClassSchedules: ScheduledClassSchedule[];
}
