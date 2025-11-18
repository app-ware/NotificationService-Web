import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Child_Ar__3214EC2738C094F4", ["id"], { unique: true })
@Index("UC_Child_un_academic_year", ["childId", "academicYearId"], {
  unique: true,
})
@Entity("Child_Archive", { schema: "dbo" })
export class ChildArchive {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Child_ID", unique: true })
  childId: number;

  @Column("nvarchar", { name: "Child_Name" })
  childName: string;

  @Column("int", { name: "academic_year_id", unique: true })
  academicYearId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
