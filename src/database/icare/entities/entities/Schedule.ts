import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("center_id", ["centerId"], {})
@Index("PK__Schedule__8C4D3BBBE30C2296", ["scheduleId"], { unique: true })
@Index("schedule_date", ["scheduleDate"], {})
@Entity("Schedule", { schema: "dbo" })
export class Schedule {
  @PrimaryGeneratedColumn({ type: "int", name: "Schedule_ID" })
  scheduleId: number;

  @Column("datetime", { name: "Schedule_Date", nullable: true })
  scheduleDate: Date | null;

  @Column("nvarchar", {
    name: "Schedule_Description",
    nullable: true,
    length: 50,
  })
  scheduleDescription: string | null;

  @Column("nvarchar", {
    name: "Schedule_Description1",
    nullable: true,
    length: 50,
  })
  scheduleDescription1: string | null;

  @Column("nvarchar", {
    name: "Schedule_Description2",
    nullable: true,
    length: 50,
  })
  scheduleDescription2: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("datetime", { name: "schedule_date_from", nullable: true })
  scheduleDateFrom: Date | null;

  @Column("datetime", { name: "schedule_date_to", nullable: true })
  scheduleDateTo: Date | null;

  @Column("nvarchar", { name: "assigned_classes", nullable: true })
  assignedClasses: string | null;

  @Column("nvarchar", { name: "schedule_items", nullable: true })
  scheduleItems: string | null;

  @Column("nvarchar", { name: "Recurrence", nullable: true, length: 25 })
  recurrence: string | null;

  @Column("int", { name: "occurs_every", nullable: true })
  occursEvery: number | null;

  @Column("int", { name: "IntervalFlag", nullable: true })
  intervalFlag: number | null;

  @Column("int", { name: "Interval", nullable: true })
  interval: number | null;

  @Column("int", { name: "Days", nullable: true })
  days: number | null;

  @Column("datetime", { name: "ending_schedule_date", nullable: true })
  endingScheduleDate: Date | null;

  @Column("bit", { name: "deleted", nullable: true })
  deleted: boolean | null;
}
