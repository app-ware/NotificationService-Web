import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { AspnetApplications } from "./AspnetApplications";
import { AspnetPersonalizationAllUsers } from "./AspnetPersonalizationAllUsers";
import { AspnetPersonalizationPerUser } from "./AspnetPersonalizationPerUser";

@Index("aspnet_Paths_index", ["applicationId", "loweredPath"], { unique: true })
@Index("PK__aspnet_P__CD67DC58C3D368BB", ["pathId"], { unique: true })
@Entity("aspnet_Paths", { schema: "dbo" })
export class AspnetPaths {
  @Column("uniqueidentifier", { name: "ApplicationId" })
  applicationId: string;

  @Column("uniqueidentifier", {
    primary: true,
    name: "PathId",
    default: () => "newid()",
  })
  pathId: string;

  @Column("nvarchar", { name: "Path", length: 256 })
  path: string;

  @Column("nvarchar", { name: "LoweredPath", length: 256 })
  loweredPath: string;

  @ManyToOne(
    () => AspnetApplications,
    (aspnetApplications) => aspnetApplications.aspnetPaths
  )
  @JoinColumn([
    { name: "ApplicationId", referencedColumnName: "applicationId" },
  ])
  application: AspnetApplications;

  @OneToOne(
    () => AspnetPersonalizationAllUsers,
    (aspnetPersonalizationAllUsers) => aspnetPersonalizationAllUsers.path
  )
  aspnetPersonalizationAllUsers: AspnetPersonalizationAllUsers;

  @OneToMany(
    () => AspnetPersonalizationPerUser,
    (aspnetPersonalizationPerUser) => aspnetPersonalizationPerUser.path
  )
  aspnetPersonalizationPerUsers: AspnetPersonalizationPerUser[];
}
