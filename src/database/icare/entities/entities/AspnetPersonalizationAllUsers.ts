import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { AspnetPaths } from "./AspnetPaths";

@Index("PK__aspnet_P__CD67DC59A89B64B7", ["pathId"], { unique: true })
@Entity("aspnet_PersonalizationAllUsers", { schema: "dbo" })
export class AspnetPersonalizationAllUsers {
  @Column("uniqueidentifier", { primary: true, name: "PathId" })
  pathId: string;

  @Column("image", { name: "PageSettings" })
  pageSettings: Buffer;

  @Column("datetime", { name: "LastUpdatedDate" })
  lastUpdatedDate: Date;

  @OneToOne(
    () => AspnetPaths,
    (aspnetPaths) => aspnetPaths.aspnetPersonalizationAllUsers
  )
  @JoinColumn([{ name: "PathId", referencedColumnName: "pathId" }])
  path: AspnetPaths;
}
