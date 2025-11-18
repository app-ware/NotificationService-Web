import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dealers } from "./Dealers";
import { AdminPages } from "./AdminPages";

@Index(
  "dealer_id-center_id-center_type-page_id",
  ["dealerId", "centerId", "centerType", "pageId"],
  { unique: true }
)
@Index("PK_Dealer_Page_Center_Access", ["id"], { unique: true })
@Entity("Dealer_Page_Center_Access", { schema: "dbo" })
export class DealerPageCenterAccess {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "dealer_id", nullable: true })
  dealerId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("int", { name: "page_id", nullable: true })
  pageId: number | null;

  @ManyToOne(() => Dealers, (dealers) => dealers.dealerPageCenterAccesses, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "dealer_id", referencedColumnName: "dealerId" }])
  dealer: Dealers;

  @ManyToOne(
    () => AdminPages,
    (adminPages) => adminPages.dealerPageCenterAccesses
  )
  @JoinColumn([{ name: "page_id", referencedColumnName: "adminPageId" }])
  page: AdminPages;
}
