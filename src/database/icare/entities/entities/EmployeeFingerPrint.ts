import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterEmployee } from "./CenterEmployee";
import { FingerPrints } from "./FingerPrints";

@Index("PK_Employee_Finger_Print", ["employeeFingerPrintId"], { unique: true })
@Entity("Employee_Finger_Print", { schema: "dbo" })
export class EmployeeFingerPrint {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_finger_print_id" })
  employeeFingerPrintId: number;

  @ManyToOne(
    () => CenterEmployee,
    (centerEmployee) => centerEmployee.employeeFingerPrints,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "employee_id", referencedColumnName: "employeeId" }])
  employee: CenterEmployee;

  @ManyToOne(
    () => FingerPrints,
    (fingerPrints) => fingerPrints.employeeFingerPrints,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "finger_print_id", referencedColumnName: "fingerPrintId" },
  ])
  fingerPrint: FingerPrints;
}
