import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_Domains", ["id"], { unique: true })
@Entity("Center_Domains", { schema: "dbo" })
export class CenterDomains {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("nvarchar", { name: "center_domain", nullable: true, length: 50 })
  centerDomain: string | null;
}
