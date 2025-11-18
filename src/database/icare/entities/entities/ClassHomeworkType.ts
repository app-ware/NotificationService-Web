import { Column, Entity, Index } from "typeorm";

@Index("PK_Class_Homework_Type", ["homeworkTypeId"], { unique: true })
@Entity("Class_Homework_Type", { schema: "dbo" })
export class ClassHomeworkType {
  @Column("int", { primary: true, name: "homework_type_id" })
  homeworkTypeId: number;

  @Column("varchar", { name: "homework_type_title", nullable: true })
  homeworkTypeTitle: string | null;
}
