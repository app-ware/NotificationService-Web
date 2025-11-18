import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYearQuizes } from "./AcademicYearQuizes";
import { Child } from "./Child";

@Index("child_id-quiz_id", ["quizId", "childId"], { unique: true })
@Index("PK_Parent_Read_Data_Quizzes", ["id"], { unique: true })
@Entity("Parent_Read_Data_Quizzes", { schema: "dbo" })
export class ParentReadDataQuizzes {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "quiz_id", nullable: true })
  quizId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(
    () => AcademicYearQuizes,
    (academicYearQuizes) => academicYearQuizes.parentReadDataQuizzes,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "quiz_id", referencedColumnName: "quizeId" }])
  quiz: AcademicYearQuizes;

  @ManyToOne(() => Child, (child) => child.parentReadDataQuizzes, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
