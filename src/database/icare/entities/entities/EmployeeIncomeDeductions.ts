import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Employee_Income_Deductions", ["incomeDeductionId"], { unique: true })
@Entity("Employee_Income_Deductions", { schema: "dbo" })
export class EmployeeIncomeDeductions {
  @PrimaryGeneratedColumn({ type: "int", name: "income_deduction_id" })
  incomeDeductionId: number;

  @Column("int", { name: "employee_income_id", nullable: true })
  employeeIncomeId: number | null;

  @Column("float", {
    name: "income_deduction_amount",
    nullable: true,
    precision: 53,
  })
  incomeDeductionAmount: number | null;

  @Column("nvarchar", { name: "income_deduction_title", nullable: true })
  incomeDeductionTitle: string | null;
}
