import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Employee__5105EB154BD761E8", ["employeeIncomeId"], { unique: true })
@Entity("Employee_Income", { schema: "dbo" })
export class EmployeeIncome {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_income_id" })
  employeeIncomeId: number;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("date", { name: "income_date", nullable: true })
  incomeDate: Date | null;

  @Column("date", { name: "income_receive_date", nullable: true })
  incomeReceiveDate: Date | null;

  @Column("float", { name: "employee_salary", nullable: true, precision: 53 })
  employeeSalary: number | null;

  @Column("int", { name: "income_status", nullable: true })
  incomeStatus: number | null;

  @Column("datetime", { name: "modified_date", nullable: true })
  modifiedDate: Date | null;
}
