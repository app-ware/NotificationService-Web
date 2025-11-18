import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Class_Ch__3214EC27685DD816", ["id"], { unique: true })
@Index("UC_Child_academic_year", ["childId", "academicYearId"], {
  unique: true,
})
@Entity("Class_Child_Archive", { schema: "dbo" })
export class ClassChildArchive {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Class_ID" })
  classId: number;

  @Column("int", { name: "Child_ID", unique: true })
  childId: number;

  @Column("int", { name: "academic_year_id", unique: true })
  academicYearId: number;
}
