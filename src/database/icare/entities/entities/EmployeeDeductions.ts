import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Employee_Deductions", ["employeeDeductionId"], { unique: true })
@Entity("Employee_Deductions", { schema: "dbo" })
export class EmployeeDeductions {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_deduction_id" })
  employeeDeductionId: number;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("int", { name: "deduction_id", nullable: true })
  deductionId: number | null;

  @Column("float", { name: "deduction_amount", nullable: true, precision: 53 })
  deductionAmount: number | null;
}
