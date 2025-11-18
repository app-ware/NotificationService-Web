import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterProvidedSubjects } from "./CenterProvidedSubjects";
import { GradingReport } from "./GradingReport";

@Index("PK__Grading___5588C66A52756E09", ["gradingReportSubjectsId"], {
  unique: true,
})
@Index(
  "UNIQUE_Grading_Report_Subject_Classes",
  ["reportSubjectId", "gradingReportId"],
  { unique: true }
)
@Entity("Grading_Report_Subjects", { schema: "dbo" })
export class GradingReportSubjects {
  @PrimaryGeneratedColumn({ type: "int", name: "grading_report_subjects_id" })
  gradingReportSubjectsId: number;

  @Column("int", { name: "report_subject_id", nullable: true, unique: true })
  reportSubjectId: number | null;

  @Column("int", { name: "grading_report_id", nullable: true, unique: true })
  gradingReportId: number | null;

  @Column("int", { name: "report_subject_order", nullable: true })
  reportSubjectOrder: number | null;

  @Column("float", { name: "subject_max_grade", nullable: true, precision: 53 })
  subjectMaxGrade: number | null;

  @Column("float", {
    name: "subject_pass_grade",
    nullable: true,
    precision: 53,
  })
  subjectPassGrade: number | null;

  @Column("float", { name: "subject_weight", nullable: true, precision: 53 })
  subjectWeight: number | null;

  @ManyToOne(
    () => CenterProvidedSubjects,
    (centerProvidedSubjects) => centerProvidedSubjects.gradingReportSubjects
  )
  @JoinColumn([
    { name: "report_subject_id", referencedColumnName: "reportSubjectId" },
  ])
  reportSubject: CenterProvidedSubjects;

  @ManyToOne(
    () => GradingReport,
    (gradingReport) => gradingReport.gradingReportSubjects
  )
  @JoinColumn([
    { name: "grading_report_id", referencedColumnName: "gradingReportId" },
  ])
  gradingReport: GradingReport;
}
