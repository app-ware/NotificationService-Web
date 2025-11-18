import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Class_Ar__3214EC2738C094F4", ["id"], { unique: true })
@Index("UC_Class_academic_year", ["classId", "academicYearId"], {
  unique: true,
})
@Entity("Class_Archive", { schema: "dbo" })
export class ClassArchive {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Class_ID", unique: true })
  classId: number;

  @Column("nvarchar", { name: "Class_Name" })
  className: string;

  @Column("int", { name: "academic_year_id", unique: true })
  academicYearId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
