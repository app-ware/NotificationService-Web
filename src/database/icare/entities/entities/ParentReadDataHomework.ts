import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassHomework } from "./ClassHomework";
import { Child } from "./Child";

@Index("child_id-homework_id", ["homeworkId", "childId"], { unique: true })
@Index("PK_Parent_Read_Data_Homework", ["id"], { unique: true })
@Entity("Parent_Read_Data_Homework", { schema: "dbo" })
export class ParentReadDataHomework {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "homework_id", nullable: true })
  homeworkId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(
    () => ClassHomework,
    (classHomework) => classHomework.parentReadDataHomeworks,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "homework_id", referencedColumnName: "homeworkId" }])
  homework: ClassHomework;

  @ManyToOne(() => Child, (child) => child.parentReadDataHomeworks, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
