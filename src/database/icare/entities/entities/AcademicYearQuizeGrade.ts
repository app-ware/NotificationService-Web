import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { AcademicYearQuizes } from "./AcademicYearQuizes";

@Index("PK__Academic__4E0A9BD435C6517C", ["quizeGradeId"], { unique: true })
@Index(
  "quize_id-quize_grade_value-INCLUDE-child_id",
  ["childId", "quizeId", "quizeGradeValue"],
  {}
)
@Index("uniq_child_quize_grade", ["childId", "quizeId"], { unique: true })
@Entity("Academic_Year_Quize_Grade", { schema: "dbo" })
export class AcademicYearQuizeGrade {
  @PrimaryGeneratedColumn({ type: "int", name: "quize_grade_id" })
  quizeGradeId: number;

  @Column("float", { name: "quize_grade_value", nullable: true, precision: 53 })
  quizeGradeValue: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "quize_id", nullable: true })
  quizeId: number | null;

  @ManyToOne(() => Child, (child) => child.academicYearQuizeGrades)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => AcademicYearQuizes,
    (academicYearQuizes) => academicYearQuizes.academicYearQuizeGrades
  )
  @JoinColumn([{ name: "quize_id", referencedColumnName: "quizeId" }])
  quize: AcademicYearQuizes;
}
