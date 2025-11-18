import { Column, Entity, Index, OneToMany } from "typeorm";
import { AspnetMembership } from "./AspnetMembership";
import { AspnetPaths } from "./AspnetPaths";
import { AspnetRoles } from "./AspnetRoles";
import { AspnetUsers } from "./AspnetUsers";

@Index("aspnet_Applications_Index", ["loweredApplicationName"], {})
@Index("PK__aspnet_A__C93A4C98F882F3EC", ["applicationId"], { unique: true })
@Index("UQ__aspnet_A__17477DE4A1B30521", ["loweredApplicationName"], {
  unique: true,
})
@Index("UQ__aspnet_A__309103310245F91D", ["applicationName"], { unique: true })
@Entity("aspnet_Applications", { schema: "dbo" })
export class AspnetApplications {
  @Column("nvarchar", { name: "ApplicationName", unique: true, length: 256 })
  applicationName: string;

  @Column("nvarchar", {
    name: "LoweredApplicationName",
    unique: true,
    length: 256,
  })
  loweredApplicationName: string;

  @Column("uniqueidentifier", {
    primary: true,
    name: "ApplicationId",
    default: () => "newid()",
  })
  applicationId: string;

  @Column("nvarchar", { name: "Description", nullable: true, length: 256 })
  description: string | null;

  @OneToMany(
    () => AspnetMembership,
    (aspnetMembership) => aspnetMembership.application
  )
  aspnetMemberships: AspnetMembership[];

  @OneToMany(() => AspnetPaths, (aspnetPaths) => aspnetPaths.application)
  aspnetPaths: AspnetPaths[];

  @OneToMany(() => AspnetRoles, (aspnetRoles) => aspnetRoles.application)
  aspnetRoles: AspnetRoles[];

  @OneToMany(() => AspnetUsers, (aspnetUsers) => aspnetUsers.application)
  aspnetUsers: AspnetUsers[];
}
