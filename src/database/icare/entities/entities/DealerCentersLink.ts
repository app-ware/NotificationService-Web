import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_DealerCentersLink", ["linkId"], { unique: true })
@Entity("DealerCentersLink", { schema: "dbo" })
export class DealerCentersLink {
  @PrimaryGeneratedColumn({ type: "int", name: "link_ID" })
  linkId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "dealer_id", nullable: true })
  dealerId: number | null;
}
