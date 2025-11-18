import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParentReadDataSchedule } from "./ParentReadDataSchedule";

@Index("PK__Schedule__3214EC279B1D1F0C", ["id"], { unique: true })
@Entity("Schedule_Image", { schema: "dbo" })
export class ScheduleImage {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("nvarchar", { name: "schedule_url", nullable: true })
  scheduleUrl: string | null;

  @Column("datetime", { name: "LastSaved", nullable: true })
  lastSaved: Date | null;

  @Column("int", { name: "academic_year_id", nullable: true })
  academicYearId: number | null;

  @OneToMany(
    () => ParentReadDataSchedule,
    (parentReadDataSchedule) => parentReadDataSchedule.schedule
  )
  parentReadDataSchedules: ParentReadDataSchedule[];
}
