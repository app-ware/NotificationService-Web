import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { AspnetApplications } from "./AspnetApplications";
import { AspnetUsers } from "./AspnetUsers";

@Index("aspnet_Roles_index1", ["applicationId", "loweredRoleName"], {
  unique: true,
})
@Index("PK__aspnet_R__8AFACE1B823CBD1E", ["roleId"], { unique: true })
@Entity("aspnet_Roles", { schema: "dbo" })
export class AspnetRoles {
  @Column("uniqueidentifier", { name: "ApplicationId" })
  applicationId: string;

  @Column("uniqueidentifier", {
    primary: true,
    name: "RoleId",
    default: () => "newid()",
  })
  roleId: string;

  @Column("nvarchar", { name: "RoleName", length: 256 })
  roleName: string;

  @Column("nvarchar", { name: "LoweredRoleName", length: 256 })
  loweredRoleName: string;

  @Column("nvarchar", { name: "Description", nullable: true, length: 256 })
  description: string | null;

  @ManyToOne(
    () => AspnetApplications,
    (aspnetApplications) => aspnetApplications.aspnetRoles
  )
  @JoinColumn([
    { name: "ApplicationId", referencedColumnName: "applicationId" },
  ])
  application: AspnetApplications;

  @ManyToMany(() => AspnetUsers, (aspnetUsers) => aspnetUsers.aspnetRoles)
  @JoinTable({
    name: "aspnet_UsersInRoles",
    joinColumns: [{ name: "RoleId", referencedColumnName: "roleId" }],
    inverseJoinColumns: [{ name: "UserId", referencedColumnName: "userId" }],
    schema: "dbo",
  })
  aspnetUsers: AspnetUsers[];
}
