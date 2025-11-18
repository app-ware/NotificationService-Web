import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GradingReport } from "./GradingReport";

@Index("PK__Grading___28AC6BC13C12033A", ["letterGradeId"], { unique: true })
@Entity("Grading_Report_Letter_Grades", { schema: "dbo" })
export class GradingReportLetterGrades {
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
    () => GradingReport,
    (gradingReport) => gradingReport.gradingReportLetterGrades
  )
  @JoinColumn([
    { name: "grading_report_id", referencedColumnName: "gradingReportId" },
  ])
  gradingReport: GradingReport;
}
