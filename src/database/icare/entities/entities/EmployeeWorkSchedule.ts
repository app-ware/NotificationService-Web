import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Employee_Work_Schedule", ["employeeScheduleId"], { unique: true })
@Entity("Employee_Work_Schedule", { schema: "dbo" })
export class EmployeeWorkSchedule {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_schedule_id" })
  employeeScheduleId: number;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("int", { name: "schedule_id", nullable: true })
  scheduleId: number | null;
}
