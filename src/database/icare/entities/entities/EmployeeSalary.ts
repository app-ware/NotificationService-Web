import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Employee__A3C71C51CF4DEAE4", ["salaryId"], { unique: true })
@Entity("Employee_Salary", { schema: "dbo" })
export class EmployeeSalary {
  @PrimaryGeneratedColumn({ type: "int", name: "salary_id" })
  salaryId: number;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("float", { name: "salary_amount", nullable: true, precision: 53 })
  salaryAmount: number | null;
}
