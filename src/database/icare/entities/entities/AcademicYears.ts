import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReport } from "./AcademicReport";
import { ActiveAcademicYear } from "./ActiveAcademicYear";
import { GradingReport } from "./GradingReport";

@Index("PK__Academic__11CFB97490192070", ["academicYearId"], { unique: true })
@Index("UQ__Academic__8D68D965ED1DCD6E", ["academicYearTitle"], {
  unique: true,
})
@Entity("Academic_Years", { schema: "dbo" })
export class AcademicYears {
  @PrimaryGeneratedColumn({ type: "int", name: "academic_year_id" })
  academicYearId: number;

  @Column("nvarchar", {
    name: "academic_year_title",
    nullable: true,
    unique: true,
    length: 100,
  })
  academicYearTitle: string | null;

  @OneToMany(
    () => AcademicReport,
    (academicReport) => academicReport.academicYear
  )
  academicReports: AcademicReport[];

  @OneToMany(
    () => ActiveAcademicYear,
    (activeAcademicYear) => activeAcademicYear.academicYear
  )
  activeAcademicYears: ActiveAcademicYear[];

  @OneToMany(() => GradingReport, (gradingReport) => gradingReport.academicYear)
  gradingReports: GradingReport[];
}
