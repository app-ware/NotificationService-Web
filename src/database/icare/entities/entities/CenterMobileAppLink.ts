import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_Mobile_App_Link", ["centerAppLinkId"], { unique: true })
@Entity("Center_Mobile_App_Link", { schema: "dbo" })
export class CenterMobileAppLink {
  @PrimaryGeneratedColumn({ type: "int", name: "center_app_link_id" })
  centerAppLinkId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("int", { name: "os_type", nullable: true })
  osType: number | null;

  @Column("nvarchar", { name: "bundle_id", nullable: true })
  bundleId: string | null;
}
