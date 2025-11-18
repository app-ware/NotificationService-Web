import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Employee__E9F5A9F73BEC3BD0", ["incomeBenefitId"], { unique: true })
@Entity("Employee_Income_Benefits", { schema: "dbo" })
export class EmployeeIncomeBenefits {
  @PrimaryGeneratedColumn({ type: "int", name: "income_benefit_id" })
  incomeBenefitId: number;

  @Column("int", { name: "employee_income_id", nullable: true })
  employeeIncomeId: number | null;

  @Column("float", {
    name: "income_benefit_amount",
    nullable: true,
    precision: 53,
  })
  incomeBenefitAmount: number | null;

  @Column("nvarchar", { name: "income_benefit_title", nullable: true })
  incomeBenefitTitle: string | null;
}
