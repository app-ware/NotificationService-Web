import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("center_id", ["centerId"], { unique: true })
@Entity("Sponsor", { schema: "dbo" })
export class Sponsor {
  @PrimaryGeneratedColumn({ type: "int", name: "sp_id" })
  spId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "sp_image", nullable: true })
  spImage: string | null;

  @Column("nvarchar", { name: "sp_url", nullable: true })
  spUrl: string | null;

  @Column("date", { name: "sp_startdate", nullable: true })
  spStartdate: Date | null;

  @Column("date", { name: "sp_enddate", nullable: true })
  spEnddate: Date | null;

  @Column("bit", { name: "sp_active", nullable: true })
  spActive: boolean | null;

  @Column("int", { name: "sp_count_toshow", nullable: true })
  spCountToshow: number | null;
}
