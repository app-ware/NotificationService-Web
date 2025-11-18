import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("working_InOut", { schema: "dbo" })
export class WorkingInOut {
  @PrimaryGeneratedColumn({ type: "bigint", name: "recID" })
  recId: string;

  @Column("bigint", { name: "attendance_ID" })
  attendanceId: string;

  @Column("time", { name: "clocked" })
  clocked: Date;

  @Column("bit", { name: "isIn" })
  isIn: boolean;

  @Column("nvarchar", { name: "center_ID", length: 50 })
  centerId: string;
}
