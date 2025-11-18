import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("System_Role_Menu_bk", { schema: "dbo" })
export class SystemRoleMenuBk {
  @PrimaryGeneratedColumn('increment',{
    type: "numeric",
    name: "ID",
  })
  id: number;

  @Column("numeric", {
    name: "RoleID",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  roleId: number | null;

  @Column("numeric", {
    name: "menuID",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  menuId: number | null;
}
