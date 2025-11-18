import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("attendance_date", ["attendanceDate"], {})
@Index(
  "attendance_date_INCLUDE_MULTIPLE",
  [
    "attendanceId",
    "employeeId",
    "scheduleStartTime",
    "scheduleEndTime",
    "attendanceDate",
  ],
  {}
)
@Index("PK_Employee_Working_Attendance", ["attendanceId"], { unique: true })
@Entity("Employee_Working_Attendance", { schema: "dbo" })
export class EmployeeWorkingAttendance {
  @PrimaryGeneratedColumn({ type: "int", name: "attendance_id" })
  attendanceId: number;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("date", { name: "attendance_date", nullable: true })
  attendanceDate: Date | null;

  @Column("time", { name: "schedule_start_time", nullable: true })
  scheduleStartTime: Date | null;

  @Column("time", { name: "schedule_end_time", nullable: true })
  scheduleEndTime: Date | null;
}
