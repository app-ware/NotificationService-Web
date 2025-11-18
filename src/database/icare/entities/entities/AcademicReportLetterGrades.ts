import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReport } from "./AcademicReport";

@Index("PK__Academic__28AC6BC1AE052960", ["letterGradeId"], { unique: true })
@Entity("Academic_Report_Letter_Grades", { schema: "dbo" })
export class AcademicReportLetterGrades {
  @PrimaryGeneratedColumn({ type: "int", name: "letter_grade_id" })
  letterGradeId: number;

  @Column("nvarchar", {
    name: "letter_grade_title",
    nullable: true,
    length: 52,
  })
  letterGradeTitle: string | null;

  @Column("float", {
    name: "letter_grade_percent_from",
    nullable: true,
    precision: 53,
  })
  letterGradePercentFrom: number | null;

  @Column("float", {
    name: "letter_grade_percent_to",
    nullable: true,
    precision: 53,
  })
  letterGradePercentTo: number | null;

  @Column("float", { name: "letter_grade_gpa", nullable: true, precision: 53 })
  letterGradeGpa: number | null;

  @ManyToOne(
    () => AcademicReport,
    (academicReport) => academicReport.academicReportLetterGrades
  )
  @JoinColumn([
    { name: "academic_report_id", referencedColumnName: "academicReportId" },
  ])
  academicReport: AcademicReport;

  @ManyToOne(
    () => AcademicReport,
    (academicReport) => academicReport.academicReportLetterGrades2
  )
  @JoinColumn([
    { name: "academic_report_id", referencedColumnName: "academicReportId" },
  ])
  academicReport_2: AcademicReport;
}
