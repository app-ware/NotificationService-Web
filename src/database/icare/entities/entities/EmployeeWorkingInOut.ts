import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("attendance_id", ["attendanceId"], {})
@Index("PK_Employee_Working_InOut", ["workingInOutId"], { unique: true })
@Entity("Employee_Working_InOut", { schema: "dbo" })
export class EmployeeWorkingInOut {
  @PrimaryGeneratedColumn({ type: "int", name: "working_InOut_id" })
  workingInOutId: number;

  @Column("int", { name: "attendance_id", nullable: true })
  attendanceId: number | null;

  @Column("time", { name: "clocked_time", nullable: true })
  clockedTime: Date | null;

  @Column("bit", { name: "is_in", nullable: true })
  isIn: boolean | null;
}
