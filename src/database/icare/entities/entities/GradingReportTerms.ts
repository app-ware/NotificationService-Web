import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GradingReportChildTermMention } from "./GradingReportChildTermMention";
import { GradingReportChildTermSubjectGrade } from "./GradingReportChildTermSubjectGrade";
import { GradingReportTermQuizzes } from "./GradingReportTermQuizzes";
import { GradingReport } from "./GradingReport";

@Index("PK__Grading___89402EC0FB35A7B5", ["gradingReportTermId"], {
  unique: true,
})
@Entity("Grading_Report_Terms", { schema: "dbo" })
export class GradingReportTerms {
  @PrimaryGeneratedColumn({ type: "int", name: "grading_report_term_id" })
  gradingReportTermId: number;

  @Column("nvarchar", { name: "grading_report_term_title", nullable: true })
  gradingReportTermTitle: string | null;

  @Column("date", { name: "grading_report_term_date_from", nullable: true })
  gradingReportTermDateFrom: Date | null;

  @Column("date", { name: "grading_report_term_date_to", nullable: true })
  gradingReportTermDateTo: Date | null;

  @Column("int", { name: "grading_report_term_type_id", nullable: true })
  gradingReportTermTypeId: number | null;

  @Column("float", {
    name: "grading_report_term_percent",
    nullable: true,
    precision: 53,
  })
  gradingReportTermPercent: number | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;

  @OneToMany(
    () => GradingReportChildTermMention,
    (gradingReportChildTermMention) =>
      gradingReportChildTermMention.gradingReportTerm
  )
  gradingReportChildTermMentions: GradingReportChildTermMention[];

  @OneToMany(
    () => GradingReportChildTermSubjectGrade,
    (gradingReportChildTermSubjectGrade) =>
      gradingReportChildTermSubjectGrade.gradingReportTerm
  )
  gradingReportChildTermSubjectGrades: GradingReportChildTermSubjectGrade[];

  @OneToMany(
    () => GradingReportTermQuizzes,
    (gradingReportTermQuizzes) => gradingReportTermQuizzes.gradingReportTerm
  )
  gradingReportTermQuizzes: GradingReportTermQuizzes[];

  @ManyToOne(
    () => GradingReport,
    (gradingReport) => gradingReport.gradingReportTerms
  )
  @JoinColumn([
    { name: "grading_report_id", referencedColumnName: "gradingReportId" },
  ])
  gradingReport: GradingReport;
}
