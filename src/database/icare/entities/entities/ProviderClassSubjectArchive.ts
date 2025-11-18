import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Provider__3214EC27CB5241CA", ["id"], { unique: true })
@Index(
  "UC_Provider_Class_Subject_academic_year",
  ["providerId", "classId", "subjectId", "academicYearId"],
  { unique: true }
)
@Entity("Provider_Class_Subject_Archive", { schema: "dbo" })
export class ProviderClassSubjectArchive {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Provider_ID", unique: true })
  providerId: number;

  @Column("int", { name: "Class_ID", unique: true })
  classId: number;

  @Column("int", { name: "Subject_ID", unique: true })
  subjectId: number;

  @Column("int", { name: "academic_year_id", unique: true })
  academicYearId: number;
}
