import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { ScheduleImage } from "./ScheduleImage";

@Index("child_id-schedule_id", ["scheduleId", "childId"], { unique: true })
@Index("PK_Parent_Read_Data_Schedule", ["id"], { unique: true })
@Entity("Parent_Read_Data_Schedule", { schema: "dbo" })
export class ParentReadDataSchedule {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "schedule_id", nullable: true })
  scheduleId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Child, (child) => child.parentReadDataSchedules, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => ScheduleImage,
    (scheduleImage) => scheduleImage.parentReadDataSchedules,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "schedule_id", referencedColumnName: "id" }])
  schedule: ScheduleImage;
}
