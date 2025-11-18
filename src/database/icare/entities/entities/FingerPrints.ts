import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeeFingerPrint } from "./EmployeeFingerPrint";
import { CareCenter } from "./CareCenter";

@Index("PK_Finger_Prints", ["fingerPrintId"], { unique: true })
@Entity("Finger_Prints", { schema: "dbo" })
export class FingerPrints {
  @PrimaryGeneratedColumn({ type: "int", name: "finger_print_id" })
  fingerPrintId: number;

  @Column("nvarchar", { name: "finger_print_code", nullable: true })
  fingerPrintCode: string | null;

  @OneToMany(
    () => EmployeeFingerPrint,
    (employeeFingerPrint) => employeeFingerPrint.fingerPrint
  )
  employeeFingerPrints: EmployeeFingerPrint[];

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.fingerPrints, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
