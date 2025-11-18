import { Column, Entity, Index, OneToMany } from "typeorm";
import { CenterUsers } from "./CenterUsers";
import { ChildUsers } from "./ChildUsers";
import { ParentUsers } from "./ParentUsers";
import { ProviderUsers } from "./ProviderUsers";

@Index("PK_Center_Types", ["centerTypeId"], { unique: true })
@Entity("Center_Types", { schema: "dbo" })
export class CenterTypes {
  @Column("int", { primary: true, name: "center_type_id" })
  centerTypeId: number;

  @Column("nvarchar", {
    name: "center_type_title",
    nullable: true,
    length: 150,
  })
  centerTypeTitle: string | null;

  @OneToMany(() => CenterUsers, (centerUsers) => centerUsers.centerType2)
  centerUsers: CenterUsers[];

  @OneToMany(() => ChildUsers, (childUsers) => childUsers.centerType2)
  childUsers: ChildUsers[];

  @OneToMany(() => ParentUsers, (parentUsers) => parentUsers.centerType2)
  parentUsers: ParentUsers[];

  @OneToMany(() => ProviderUsers, (providerUsers) => providerUsers.centerType2)
  providerUsers: ProviderUsers[];
}
