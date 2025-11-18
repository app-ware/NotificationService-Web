import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_Employee_Schedule", ["scheduleId"], { unique: true })
@Entity("Center_Work_Schedule", { schema: "dbo" })
export class CenterWorkSchedule {
  @PrimaryGeneratedColumn({ type: "int", name: "schedule_id" })
  scheduleId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "schedule_name", nullable: true })
  scheduleName: string | null;

  @Column("nvarchar", { name: "schedule_description", nullable: true })
  scheduleDescription: string | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;
}
