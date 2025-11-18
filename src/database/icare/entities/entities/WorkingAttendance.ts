import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("working_Attendance", { schema: "dbo" })
export class WorkingAttendance {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Attendance_ID" })
  attendanceId: string;

  @Column("bigint", { name: "Employee_ID" })
  employeeId: string;

  @Column("nvarchar", { name: "NFC_ID", length: 50 })
  nfcId: string;

  @Column("date", { name: "Att_Date" })
  attDate: Date;

  @Column("nchar", { name: "Center_ID", length: 10 })
  centerId: string;
}
