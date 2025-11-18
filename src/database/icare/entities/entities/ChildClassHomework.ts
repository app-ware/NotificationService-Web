import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Child_Cl__ADD06177B1810BC5", ["childClassHomeworkId"], {
  unique: true,
})
@Entity("Child_Class_Homework", { schema: "dbo" })
export class ChildClassHomework {
  @PrimaryGeneratedColumn({ type: "int", name: "child_class_homework_id" })
  childClassHomeworkId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "homework_id", nullable: true })
  homeworkId: number | null;

  @Column("bit", { name: "is_done", nullable: true })
  isDone: boolean | null;

  @Column("datetime", { name: "modify_date", nullable: true })
  modifyDate: Date | null;
}
