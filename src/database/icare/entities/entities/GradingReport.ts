import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";
import { AcademicYears } from "./AcademicYears";
import { GradingReportClasses } from "./GradingReportClasses";
import { GradingReportLetterGrades } from "./GradingReportLetterGrades";
import { GradingReportSubjects } from "./GradingReportSubjects";
import { GradingReportTerms } from "./GradingReportTerms";

@Index("PK__grading__6022596C6FFBCDB6", ["gradingReportId"], { unique: true })
@Entity("Grading_Report", { schema: "dbo" })
export class GradingReport {
  @PrimaryGeneratedColumn({ type: "int", name: "grading_report_id" })
  gradingReportId: number;

  @Column("nvarchar", { name: "grading_report_title", nullable: true })
  gradingReportTitle: string | null;

  @Column("nvarchar", { name: "grading_report_description", nullable: true })
  gradingReportDescription: string | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @Column("int", { name: "grading_report_type", nullable: true })
  gradingReportType: number | null;

  @Column("int", { name: "grading_report_ranking_type", nullable: true })
  gradingReportRankingType: number | null;

  @Column("int", {
    name: "grading_report_template_language_id",
    nullable: true,
  })
  gradingReportTemplateLanguageId: number | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.gradingReports)
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;

  @ManyToOne(
    () => AcademicYears,
    (academicYears) => academicYears.gradingReports
  )
  @JoinColumn([
    { name: "academic_year_id", referencedColumnName: "academicYearId" },
  ])
  academicYear: AcademicYears;

  @OneToMany(
    () => GradingReportClasses,
    (gradingReportClasses) => gradingReportClasses.gradingReport
  )
  gradingReportClasses: GradingReportClasses[];

  @OneToMany(
    () => GradingReportLetterGrades,
    (gradingReportLetterGrades) => gradingReportLetterGrades.gradingReport
  )
  gradingReportLetterGrades: GradingReportLetterGrades[];

  @OneToMany(
    () => GradingReportSubjects,
    (gradingReportSubjects) => gradingReportSubjects.gradingReport
  )
  gradingReportSubjects: GradingReportSubjects[];

  @OneToMany(
    () => GradingReportTerms,
    (gradingReportTerms) => gradingReportTerms.gradingReport
  )
  gradingReportTerms: GradingReportTerms[];
}
