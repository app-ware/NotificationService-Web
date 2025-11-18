import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReportLetterGradesLink } from "./AcademicReportLetterGradesLink";

@Index("PK__Center_L__28AC6BC185E85E29", ["letterGradeId"], { unique: true })
@Entity("Center_Letter_Grades", { schema: "dbo" })
export class CenterLetterGrades {
  @PrimaryGeneratedColumn({ type: "int", name: "letter_grade_id" })
  letterGradeId: number;

  @Column("nvarchar", {
    name: "letter_grade_title",
    nullable: true,
    length: 10,
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

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @OneToMany(
    () => AcademicReportLetterGradesLink,
    (academicReportLetterGradesLink) =>
      academicReportLetterGradesLink.letterGrade
  )
  academicReportLetterGradesLinks: AcademicReportLetterGradesLink[];
}
