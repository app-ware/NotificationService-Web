import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_App_Link", ["centerAppLinkId"], { unique: true })
@Entity("Center_Parent_App_Link", { schema: "dbo" })
export class CenterParentAppLink {
  @PrimaryGeneratedColumn({ type: "int", name: "center_app_link_id" })
  centerAppLinkId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "app_link_url", nullable: true })
  appLinkUrl: string | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;
}
