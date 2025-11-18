import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SystemMenusNew } from "./SystemMenusNew";
import { CareCenter } from "./CareCenter";

@Index("PK_System_Menu_Special_Privilege", ["id"], { unique: true })
@Entity("System_Menu_Special_Privilege", { schema: "dbo" })
export class SystemMenuSpecialPrivilege {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @ManyToOne(
    () => SystemMenusNew,
    (systemMenusNew) => systemMenusNew.systemMenuSpecialPrivileges,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "menu_id", referencedColumnName: "menuId" }])
  menu: SystemMenusNew;

  @ManyToOne(
    () => CareCenter,
    (careCenter) => careCenter.systemMenuSpecialPrivileges,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
