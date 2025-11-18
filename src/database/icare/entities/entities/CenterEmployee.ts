import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeeFingerPrint } from "./EmployeeFingerPrint";

@Index("PK__Center_E__C52E0BA8121412B7", ["employeeId"], { unique: true })
@Entity("Center_Employee", { schema: "dbo" })
export class CenterEmployee {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_id" })
  employeeId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "employee_name", nullable: true })
  employeeName: string | null;

  @Column("nvarchar", { name: "employee_title", nullable: true })
  employeeTitle: string | null;

  @Column("nvarchar", { name: "employee_photo", nullable: true })
  employeePhoto: string | null;

  @Column("nvarchar", { name: "employee_mobile", nullable: true })
  employeeMobile: string | null;

  @Column("nvarchar", { name: "employee_notes", nullable: true })
  employeeNotes: string | null;

  @Column("nvarchar", { name: "employee_email", nullable: true })
  employeeEmail: string | null;

  @Column("int", { name: "employee_gender", nullable: true })
  employeeGender: number | null;

  @Column("date", { name: "employee_dob", nullable: true })
  employeeDob: Date | null;

  @Column("date", { name: "employee_joining_date", nullable: true })
  employeeJoiningDate: Date | null;

  @Column("nvarchar", { name: "employee_passport_number", nullable: true })
  employeePassportNumber: string | null;

  @Column("nvarchar", { name: "employee_sponsor", nullable: true })
  employeeSponsor: string | null;

  @Column("nvarchar", { name: "employee_residency_id", nullable: true })
  employeeResidencyId: string | null;

  @Column("date", { name: "employee_residency_validity_date", nullable: true })
  employeeResidencyValidityDate: Date | null;

  @Column("nvarchar", { name: "employee_national_id_number", nullable: true })
  employeeNationalIdNumber: string | null;

  @Column("date", {
    name: "employee_national_id_validity_date",
    nullable: true,
  })
  employeeNationalIdValidityDate: Date | null;

  @Column("date", {
    name: "employee_medical_insurance_validity_date",
    nullable: true,
  })
  employeeMedicalInsuranceValidityDate: Date | null;

  @Column("bit", { name: "is_provider", nullable: true })
  isProvider: boolean | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("date", { name: "employee_healthcard_validity_date", nullable: true })
  employeeHealthcardValidityDate: Date | null;

  @Column("date", { name: "employee_laborcard_validity_date", nullable: true })
  employeeLaborcardValidityDate: Date | null;

  @OneToMany(
    () => EmployeeFingerPrint,
    (employeeFingerPrint) => employeeFingerPrint.employee
  )
  employeeFingerPrints: EmployeeFingerPrint[];
}
