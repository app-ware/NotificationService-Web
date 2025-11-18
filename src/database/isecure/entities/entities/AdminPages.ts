import { Column, Entity, Index, OneToMany } from "typeorm";
import { DealerPageCenterAccess } from "./DealerPageCenterAccess";

@Index("PK_Admin_Pages", ["adminPageId"], { unique: true })
@Entity("Admin_Pages", { schema: "dbo" })
export class AdminPages {
  @Column("int", { primary: true, name: "admin_page_id" })
  adminPageId: number;

  @Column("nvarchar", { name: "admin_page_title", nullable: true })
  adminPageTitle: string | null;

  @OneToMany(
    () => DealerPageCenterAccess,
    (dealerPageCenterAccess) => dealerPageCenterAccess.page
  )
  dealerPageCenterAccesses: DealerPageCenterAccess[];
}
