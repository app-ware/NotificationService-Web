import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_Schedule_time", ["scheduleTimeId"], { unique: true })
@Entity("Center_Schedule_time", { schema: "dbo" })
export class CenterScheduleTime {
  @PrimaryGeneratedColumn({ type: "int", name: "schedule_time_id" })
  scheduleTimeId: number;

  @Column("int", { name: "schedule_id", nullable: true })
  scheduleId: number | null;

  @Column("nvarchar", { name: "schedule_day", nullable: true })
  scheduleDay: string | null;

  @Column("time", { name: "start_time", nullable: true })
  startTime: Date | null;

  @Column("time", { name: "end_time", nullable: true })
  endTime: Date | null;

  @Column("bit", { name: "is_working", nullable: true })
  isWorking: boolean | null;
}
