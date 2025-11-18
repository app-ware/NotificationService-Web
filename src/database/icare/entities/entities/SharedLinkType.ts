import { Column, Entity, Index, OneToMany } from "typeorm";
import { CenterSharedLinks } from "./CenterSharedLinks";

@Index("PK__Shared_L__E83A87F88692BF23", ["sharedLinkTypeId"], { unique: true })
@Entity("Shared_Link_Type", { schema: "dbo" })
export class SharedLinkType {
  @Column("int", { primary: true, name: "shared_link_type_id" })
  sharedLinkTypeId: number;

  @Column("nvarchar", { name: "shared_link_type_name", length: 250 })
  sharedLinkTypeName: string;

  @Column("nvarchar", { name: "shared_link_type_icon", length: 250 })
  sharedLinkTypeIcon: string;

  @OneToMany(
    () => CenterSharedLinks,
    (centerSharedLinks) => centerSharedLinks.sharedLinkType
  )
  centerSharedLinks: CenterSharedLinks[];
}
