import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Employee__7D97C83584033969", ["employeeLeaveId"], { unique: true })
@Entity("Employee_leave", { schema: "dbo" })
export class EmployeeLeave {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_leave_id" })
  employeeLeaveId: number;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("int", { name: "leave_type", nullable: true })
  leaveType: number | null;

  @Column("date", { name: "leave_date", nullable: true })
  leaveDate: Date | null;

  @Column("bit", { name: "is_accepted", nullable: true })
  isAccepted: boolean | null;
}
