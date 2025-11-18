import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { GradingReportTerms } from "./GradingReportTerms";
import { CenterProvidedSubjects } from "./CenterProvidedSubjects";

@Index("PK__Grading___3214EC274DE31363", ["id"], { unique: true })
@Entity("Grading_Report_Child_Term_Subject_Grade", { schema: "dbo" })
export class GradingReportChildTermSubjectGrade {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("float", { name: "grade_value", nullable: true, precision: 53 })
  gradeValue: number | null;

  @ManyToOne(() => Child, (child) => child.gradingReportChildTermSubjectGrades)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => GradingReportTerms,
    (gradingReportTerms) =>
      gradingReportTerms.gradingReportChildTermSubjectGrades
  )
  @JoinColumn([
    {
      name: "grading_report_term_id",
      referencedColumnName: "gradingReportTermId",
    },
  ])
  gradingReportTerm: GradingReportTerms;

  @ManyToOne(
    () => CenterProvidedSubjects,
    (centerProvidedSubjects) =>
      centerProvidedSubjects.gradingReportChildTermSubjectGrades
  )
  @JoinColumn([{ name: "subject_id", referencedColumnName: "reportSubjectId" }])
  subject: CenterProvidedSubjects;
}
