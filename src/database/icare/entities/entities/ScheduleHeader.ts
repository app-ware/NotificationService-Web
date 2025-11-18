import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Schedule__8C4D3BBB541906B9", ["scheduleId"], { unique: true })
@Entity("Schedule_Header", { schema: "dbo" })
export class ScheduleHeader {
  @PrimaryGeneratedColumn({ type: "int", name: "Schedule_ID" })
  scheduleId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

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

  @Column("nvarchar", { name: "assigned_classes", nullable: true })
  assignedClasses: string | null;

  @Column("nvarchar", { name: "schedule_items", nullable: true })
  scheduleItems: string | null;

  @Column("int", { name: "occurs_every", nullable: true })
  occursEvery: number | null;

  @Column("int", { name: "Interval", nullable: true })
  interval: number | null;

  @Column("bit", { name: "deleted", nullable: true })
  deleted: boolean | null;

  @Column("int", { name: "parent_schedule_id", nullable: true })
  parentScheduleId: number | null;
}
