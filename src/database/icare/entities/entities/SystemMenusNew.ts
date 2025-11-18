import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SystemMenuSpecialPrivilege } from "./SystemMenuSpecialPrivilege";

@Index("PK__System_M__3B407E94878BCC35", ["menuId"], { unique: true })
@Entity("System_Menus_New", { schema: "dbo" })
export class SystemMenusNew {
  @PrimaryGeneratedColumn({ type: "int", name: "menuID" })
  menuId: number;

  @Column("nvarchar", { name: "state", nullable: true, length: 200 })
  state: string | null;

  @Column("nvarchar", { name: "url", nullable: true, length: 200 })
  url: string | null;

  @Column("nvarchar", { name: "templateUrl", nullable: true, length: 200 })
  templateUrl: string | null;

  @Column("int", { name: "CenterType", nullable: true })
  centerType: number | null;

  @Column("bit", { name: "Visible", nullable: true, default: () => "(0)" })
  visible: boolean | null;

  @Column("bit", { name: "active", nullable: true, default: () => "(1)" })
  active: boolean | null;

  @Column("bit", { name: "default", nullable: true, default: () => "(0)" })
  default: boolean | null;

  @Column("nvarchar", { name: "page_description", nullable: true })
  pageDescription: string | null;

  @Column("nvarchar", { name: "page_name", nullable: true })
  pageName: string | null;

  @Column("bit", {
    name: "needs_admin_permission",
    nullable: true,
    default: () => "(0)",
  })
  needsAdminPermission: boolean | null;

  @OneToMany(
    () => SystemMenuSpecialPrivilege,
    (systemMenuSpecialPrivilege) => systemMenuSpecialPrivilege.menu
  )
  systemMenuSpecialPrivileges: SystemMenuSpecialPrivilege[];
}
