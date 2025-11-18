import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { AspnetMembership } from "./AspnetMembership";
import { AspnetPersonalizationPerUser } from "./AspnetPersonalizationPerUser";
import { AspnetProfile } from "./AspnetProfile";
import { AspnetApplications } from "./AspnetApplications";
import { AspnetRoles } from "./AspnetRoles";

@Index("aspnet_Users_Index", ["applicationId", "loweredUserName"], {
  unique: true,
})
@Index("aspnet_Users_Index2", ["applicationId", "lastActivityDate"], {})
@Index("PK__aspnet_U__1788CC4D0CD769B4", ["userId"], { unique: true })
@Entity("aspnet_Users", { schema: "dbo" })
export class AspnetUsers {
  @Column("uniqueidentifier", { name: "ApplicationId" })
  applicationId: string;

  @Column("uniqueidentifier", {
    primary: true,
    name: "UserId",
    default: () => "newid()",
  })
  userId: string;

  @Column("nvarchar", { name: "UserName", length: 256 })
  userName: string;

  @Column("nvarchar", { name: "LoweredUserName", length: 256 })
  loweredUserName: string;

  @Column("nvarchar", {
    name: "MobileAlias",
    nullable: true,
    length: 16,
    default: () => "NULL",
  })
  mobileAlias: string | null;

  @Column("bit", { name: "IsAnonymous", default: () => "(0)" })
  isAnonymous: boolean;

  @Column("datetime", { name: "LastActivityDate" })
  lastActivityDate: Date;

  @OneToOne(() => AspnetMembership, (aspnetMembership) => aspnetMembership.user)
  aspnetMembership: AspnetMembership;

  @OneToMany(
    () => AspnetPersonalizationPerUser,
    (aspnetPersonalizationPerUser) => aspnetPersonalizationPerUser.user
  )
  aspnetPersonalizationPerUsers: AspnetPersonalizationPerUser[];

  @OneToOne(() => AspnetProfile, (aspnetProfile) => aspnetProfile.user)
  aspnetProfile: AspnetProfile;

  @ManyToOne(
    () => AspnetApplications,
    (aspnetApplications) => aspnetApplications.aspnetUsers
  )
  @JoinColumn([
    { name: "ApplicationId", referencedColumnName: "applicationId" },
  ])
  application: AspnetApplications;

  @ManyToMany(() => AspnetRoles, (aspnetRoles) => aspnetRoles.aspnetUsers)
  aspnetRoles: AspnetRoles[];
}
