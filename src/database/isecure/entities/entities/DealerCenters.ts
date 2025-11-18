import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dealers } from "./Dealers";

@Index("PK_Dealer_Centers", ["id"], { unique: true })
@Entity("Dealer_Centers", { schema: "dbo" })
export class DealerCenters {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @ManyToOne(() => Dealers, (dealers) => dealers.dealerCenters, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "dealer_id", referencedColumnName: "dealerId" }])
  dealer: Dealers;
}
