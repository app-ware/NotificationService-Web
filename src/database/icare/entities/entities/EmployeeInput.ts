import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Employee_Input", ["employeeInputId"], { unique: true })
@Entity("Employee_Input", { schema: "dbo" })
export class EmployeeInput {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_input_id" })
  employeeInputId: number;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("int", { name: "nfc_id", nullable: true })
  nfcId: number | null;
}
