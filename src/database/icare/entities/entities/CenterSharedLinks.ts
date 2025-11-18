import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";
import { SharedLinkType } from "./SharedLinkType";
import { SharedLinkClasses } from "./SharedLinkClasses";

@Index("center_id", ["centerId"], {})
@Index("PK__Center_S__85C2C09148B6721C", ["centerSharedLinkId"], {
  unique: true,
})
@Entity("Center_Shared_Links", { schema: "dbo" })
export class CenterSharedLinks {
  @PrimaryGeneratedColumn({ type: "int", name: "center_shared_link_id" })
  centerSharedLinkId: number;

  @Column("int", { name: "center_id" })
  centerId: number;

  @Column("nvarchar", { name: "center_shared_link" })
  centerSharedLink: string;

  @Column("nvarchar", { name: "center_shared_link_name", length: 250 })
  centerSharedLinkName: string;

  @Column("nvarchar", {
    name: "center_shared_link_description",
    nullable: true,
    length: 500,
  })
  centerSharedLinkDescription: string | null;

  @Column("int", { name: "center_shared_link_order", nullable: true })
  centerSharedLinkOrder: number | null;

  @Column("bit", { name: "is_global", nullable: true, default: () => "(0)" })
  isGlobal: boolean | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.centerSharedLinks)
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;

  @ManyToOne(
    () => SharedLinkType,
    (sharedLinkType) => sharedLinkType.centerSharedLinks
  )
  @JoinColumn([
    { name: "shared_link_type_id", referencedColumnName: "sharedLinkTypeId" },
  ])
  sharedLinkType: SharedLinkType;

  @OneToMany(
    () => SharedLinkClasses,
    (sharedLinkClasses) => sharedLinkClasses.centerSharedLink
  )
  sharedLinkClasses: SharedLinkClasses[];
}
