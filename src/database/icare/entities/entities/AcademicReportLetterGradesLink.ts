import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReport } from "./AcademicReport";
import { CenterLetterGrades } from "./CenterLetterGrades";

@Index("PK__Academic__3213E83F85CCD3C2", ["id"], { unique: true })
@Entity("Academic_Report_Letter_Grades_Link", { schema: "dbo" })
export class AcademicReportLetterGradesLink {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne(
    () => AcademicReport,
    (academicReport) => academicReport.academicReportLetterGradesLinks
  )
  @JoinColumn([
    { name: "academic_report_id", referencedColumnName: "academicReportId" },
  ])
  academicReport: AcademicReport;

  @ManyToOne(
    () => CenterLetterGrades,
    (centerLetterGrades) => centerLetterGrades.academicReportLetterGradesLinks
  )
  @JoinColumn([
    { name: "letter_grade_id", referencedColumnName: "letterGradeId" },
  ])
  letterGrade: CenterLetterGrades;
}
