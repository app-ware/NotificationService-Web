import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Employee__FE3DFCFF708C3F93", ["employeeBenefitId"], {
  unique: true,
})
@Entity("Employee_Additional_Benefits", { schema: "dbo" })
export class EmployeeAdditionalBenefits {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_benefit_id" })
  employeeBenefitId: number;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("int", { name: "benefit_id", nullable: true })
  benefitId: number | null;

  @Column("float", { name: "benefit_amount", nullable: true, precision: 53 })
  benefitAmount: number | null;
}
