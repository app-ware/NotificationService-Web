import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { GradingReportTermQuizzes } from "./GradingReportTermQuizzes";

@Index("PK__Grading___EE5B2B9F554FE295", ["quizGradeId"], { unique: true })
@Entity("Grading_Report_Term_Quiz_Grade", { schema: "dbo" })
export class GradingReportTermQuizGrade {
  @PrimaryGeneratedColumn({ type: "int", name: "quiz_grade_id" })
  quizGradeId: number;

  @Column("float", { name: "quiz_grade_value", nullable: true, precision: 53 })
  quizGradeValue: number | null;

  @ManyToOne(() => Child, (child) => child.gradingReportTermQuizGrades)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => GradingReportTermQuizzes,
    (gradingReportTermQuizzes) =>
      gradingReportTermQuizzes.gradingReportTermQuizGrades
  )
  @JoinColumn([{ name: "quiz_id", referencedColumnName: "quizId" }])
  quiz: GradingReportTermQuizzes;
}
