import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Employee__18B6960DC8AAEF66", ["employeeAnnualLeaveId"], {
  unique: true,
})
@Entity("Employee_Annual_Leave", { schema: "dbo" })
export class EmployeeAnnualLeave {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_annual_leave_id" })
  employeeAnnualLeaveId: number;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("int", { name: "annual_leave", nullable: true })
  annualLeave: number | null;

  @Column("int", { name: "annual_leave_year", nullable: true })
  annualLeaveYear: number | null;
}
