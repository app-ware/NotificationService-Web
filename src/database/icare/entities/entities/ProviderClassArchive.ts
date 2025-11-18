import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Provider__3214EC27A7E2D5E7", ["id"], { unique: true })
@Index(
  "UC_Provider_Class_academic_year",
  ["providerId", "classId", "academicYearId"],
  { unique: true }
)
@Entity("Provider_Class_Archive", { schema: "dbo" })
export class ProviderClassArchive {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Provider_ID", unique: true })
  providerId: number;

  @Column("int", { name: "Class_ID", unique: true })
  classId: number;

  @Column("int", { name: "academic_year_id", unique: true })
  academicYearId: number;
}
