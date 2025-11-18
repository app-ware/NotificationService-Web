import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Provider__3214EC277BB97AE4", ["id"], { unique: true })
@Index("UC_Provider_academic_year", ["providerId", "academicYearId"], {
  unique: true,
})
@Entity("Provider_Archive", { schema: "dbo" })
export class ProviderArchive {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Provider_ID", unique: true })
  providerId: number;

  @Column("nvarchar", { name: "Provider_Name" })
  providerName: string;

  @Column("int", { name: "academic_year_id", unique: true })
  academicYearId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
