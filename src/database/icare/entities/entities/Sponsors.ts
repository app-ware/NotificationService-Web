import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Sponsors", { schema: "dbo" })
export class Sponsors {
  @PrimaryGeneratedColumn({ type: "int", name: "sp_id" })
  spId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "sp_image" })
  spImage: string;

  @Column("nvarchar", { name: "sp_url", nullable: true })
  spUrl: string | null;

  @Column("date", { name: "sp_startdate" })
  spStartdate: Date;

  @Column("date", { name: "sp_enddate" })
  spEnddate: Date;

  @Column("nvarchar", { name: "sp_active", nullable: true, length: 50 })
  spActive: string | null;
}
