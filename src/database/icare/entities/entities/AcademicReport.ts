import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYears } from "./AcademicYears";
import { AcademicReportChildFinalResult } from "./AcademicReportChildFinalResult";
import { AcademicReportClassSubjectInfo } from "./AcademicReportClassSubjectInfo";
import { AcademicReportClasses } from "./AcademicReportClasses";
import { AcademicReportHeader } from "./AcademicReportHeader";
import { AcademicReportLetterGrades } from "./AcademicReportLetterGrades";
import { AcademicReportLetterGradesLink } from "./AcademicReportLetterGradesLink";
import { AcademicReportSubjects } from "./AcademicReportSubjects";

@Index("PK__Academic__3AC3EEB51401971B", ["academicReportId"], { unique: true })
@Entity("Academic_Report", { schema: "dbo" })
export class AcademicReport {
  @PrimaryGeneratedColumn({ type: "int", name: "academic_report_id" })
  academicReportId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "academic_report_title", nullable: true })
  academicReportTitle: string | null;

  @Column("nvarchar", { name: "academic_report_description", nullable: true })
  academicReportDescription: string | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;

  @Column("int", { name: "academic_report_type", nullable: true })
  academicReportType: number | null;

  @Column("int", { name: "academic_report_ranking_type", nullable: true })
  academicReportRankingType: number | null;

  @Column("bit", { name: "is_archived", nullable: true, default: () => "(0)" })
  isArchived: boolean | null;

  @Column("int", {
    name: "grading_report_template_language_id",
    nullable: true,
  })
  gradingReportTemplateLanguageId: number | null;

  @ManyToOne(
    () => AcademicYears,
    (academicYears) => academicYears.academicReports
  )
  @JoinColumn([
    { name: "academic_year_id", referencedColumnName: "academicYearId" },
  ])
  academicYear: AcademicYears;

  @OneToMany(
    () => AcademicReportChildFinalResult,
    (academicReportChildFinalResult) =>
      academicReportChildFinalResult.academicReport
  )
  academicReportChildFinalResults: AcademicReportChildFinalResult[];

  @OneToMany(
    () => AcademicReportClassSubjectInfo,
    (academicReportClassSubjectInfo) =>
      academicReportClassSubjectInfo.academicReport
  )
  academicReportClassSubjectInfos: AcademicReportClassSubjectInfo[];

  @OneToMany(
    () => AcademicReportClasses,
    (academicReportClasses) => academicReportClasses.academicReport
  )
  academicReportClasses: AcademicReportClasses[];

  @OneToMany(
    () => AcademicReportHeader,
    (academicReportHeader) => academicReportHeader.academicReport
  )
  academicReportHeaders: AcademicReportHeader[];

  @OneToMany(
    () => AcademicReportLetterGrades,
    (academicReportLetterGrades) => academicReportLetterGrades.academicReport
  )
  academicReportLetterGrades: AcademicReportLetterGrades[];

  @OneToMany(
    () => AcademicReportLetterGrades,
    (academicReportLetterGrades) => academicReportLetterGrades.academicReport_2
  )
  academicReportLetterGrades2: AcademicReportLetterGrades[];

  @OneToMany(
    () => AcademicReportLetterGradesLink,
    (academicReportLetterGradesLink) =>
      academicReportLetterGradesLink.academicReport
  )
  academicReportLetterGradesLinks: AcademicReportLetterGradesLink[];

  @OneToMany(
    () => AcademicReportSubjects,
    (academicReportSubjects) => academicReportSubjects.academicReport
  )
  academicReportSubjects: AcademicReportSubjects[];
}
