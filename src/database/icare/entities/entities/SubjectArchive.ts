import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Subject__3214EC277BB97AE4", ["id"], { unique: true })
@Index("UC_Subject_academic_year", ["subjectId", "academicYearId"], {
  unique: true,
})
@Entity("Subject_Archive", { schema: "dbo" })
export class SubjectArchive {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Subject_ID", unique: true })
  subjectId: number;

  @Column("nvarchar", { name: "Subject_Name" })
  subjectName: string;

  @Column("int", { name: "academic_year_id", unique: true })
  academicYearId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
