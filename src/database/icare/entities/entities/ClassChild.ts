import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("child_id", ["childId"], {})
@Index("class_id", ["classId"], {})
@Entity("Class_Child", { schema: "dbo" })
export class ClassChild {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "Class_ID", nullable: true })
  classId: number | null;

  @Column("int", { name: "Child_ID", nullable: true })
  childId: number | null;

  @Column("int", { name: "academic_year_id", nullable: true })
  academicYearId: number | null;
}
