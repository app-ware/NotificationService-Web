import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYears } from "./AcademicYears";

@Index("PK__Active_A__3213E83F3508C9EB", ["id"], { unique: true })
@Index("UQ__Active_A__290A28865747AFC1", ["centerId"], { unique: true })
@Entity("Active_Academic_Year", { schema: "dbo" })
export class ActiveAcademicYear {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "center_id", unique: true })
  centerId: number;

  @ManyToOne(
    () => AcademicYears,
    (academicYears) => academicYears.activeAcademicYears
  )
  @JoinColumn([
    { name: "academic_year_id", referencedColumnName: "academicYearId" },
  ])
  academicYear: AcademicYears;
}
