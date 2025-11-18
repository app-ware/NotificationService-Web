import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AspnetPaths } from "./AspnetPaths";
import { AspnetUsers } from "./AspnetUsers";

@Index("aspnet_PersonalizationPerUser_index1", ["pathId", "userId"], {
  unique: true,
})
@Index("aspnet_PersonalizationPerUser_ncindex2", ["userId", "pathId"], {
  unique: true,
})
@Index("PK__aspnet_P__3214EC061B925460", ["id"], { unique: true })
@Entity("aspnet_PersonalizationPerUser", { schema: "dbo" })
export class AspnetPersonalizationPerUser {
  @Column("uniqueidentifier", {
    primary: true,
    name: "Id",
    default: () => "newid()",
  })
  id: string;

  @Column("uniqueidentifier", { name: "PathId", nullable: true })
  pathId: string | null;

  @Column("uniqueidentifier", { name: "UserId", nullable: true })
  userId: string | null;

  @Column("image", { name: "PageSettings" })
  pageSettings: Buffer;

  @Column("datetime", { name: "LastUpdatedDate" })
  lastUpdatedDate: Date;

  @ManyToOne(
    () => AspnetPaths,
    (aspnetPaths) => aspnetPaths.aspnetPersonalizationPerUsers
  )
  @JoinColumn([{ name: "PathId", referencedColumnName: "pathId" }])
  path: AspnetPaths;

  @ManyToOne(
    () => AspnetUsers,
    (aspnetUsers) => aspnetUsers.aspnetPersonalizationPerUsers
  )
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: AspnetUsers;
}
