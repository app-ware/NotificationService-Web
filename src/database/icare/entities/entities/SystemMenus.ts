import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("System_Menus", { schema: "dbo" })
export class SystemMenus {
  @PrimaryGeneratedColumn({ type: "int", name: "menuID" })
  menuId: number;

  @Column("nvarchar", { name: "MenuName", nullable: true, length: 50 })
  menuName: string | null;

  @Column("nvarchar", { name: "MenuCaption", nullable: true, length: 50 })
  menuCaption: string | null;

  @Column("nvarchar", { name: "MenuRef", nullable: true, length: 50 })
  menuRef: string | null;

  @Column("numeric", {
    name: "CenterType",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  centerType: number | null;

  @Column("int", { name: "Visible", nullable: true })
  visible: number | null;
}
