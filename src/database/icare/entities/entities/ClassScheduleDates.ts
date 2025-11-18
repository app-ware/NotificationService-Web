import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassScheduleClassDateLink } from "./ClassScheduleClassDateLink";
import { Weekdays } from "./Weekdays";

@Index(
  "NonClusteredIndex-20190314-080714",
  ["classScheduleDate", "classScheduleType"],
  {}
)
@Index("PK__ClassSch__9788CB74F32EF7C9", ["classScheduleDateId"], {
  unique: true,
})
@Entity("ClassSchedule_Dates", { schema: "dbo" })
export class ClassScheduleDates {
  @PrimaryGeneratedColumn({ type: "int", name: "classSchedule_date_id" })
  classScheduleDateId: number;

  @Column("int", { name: "classSchedule_id", nullable: true })
  classScheduleId: number | null;

  @Column("date", { name: "classSchedule_date", nullable: true })
  classScheduleDate: Date | null;

  @Column("int", { name: "classSchedule_type", nullable: true })
  classScheduleType: number | null;

  @OneToMany(
    () => ClassScheduleClassDateLink,
    (classScheduleClassDateLink) => classScheduleClassDateLink.classScheduleDate
  )
  classScheduleClassDateLinks: ClassScheduleClassDateLink[];

  @ManyToOne(() => Weekdays, (weekdays) => weekdays.classScheduleDates)
  @JoinColumn([{ name: "weekday_id", referencedColumnName: "weekdayId" }])
  weekday: Weekdays;
}
