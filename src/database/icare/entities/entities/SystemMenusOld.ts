import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("System_MenusOld", { schema: "dbo" })
export class SystemMenusOld {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("float", { name: "menuID", nullable: true, precision: 53 })
  menuId: number | null;

  @Column("nvarchar", { name: "MenuName", nullable: true })
  menuName: string | null;

  @Column("nvarchar", { name: "MenuCaption", nullable: true })
  menuCaption: string | null;

  @Column("nvarchar", { name: "MenuRef", nullable: true })
  menuRef: string | null;

  @Column("float", { name: "CenterType", nullable: true, precision: 53 })
  centerType: number | null;

  @Column("float", { name: "Visible", nullable: true, precision: 53 })
  visible: number | null;
}
