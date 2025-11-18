import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenuItem } from "./MenuItem";

@Index(
  "menu_Id - menu_type",
  ["itemId", "menuItemLinkOrder", "menuId", "menuType"],
  {}
)
@Index(
  "menu_type-INCLUDE_MULTIPLE",
  ["itemId", "menuId", "menuItemLinkOrder", "menuType"],
  {}
)
@Index("PK__Menu_Ite__93A0B27AB31C793F", ["menuItemLinkId"], { unique: true })
@Entity("Menu_Item_Link", { schema: "dbo" })
export class MenuItemLink {
  @PrimaryGeneratedColumn({ type: "int", name: "menu_item_link_id" })
  menuItemLinkId: number;

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null;

  @Column("int", { name: "menu_id", nullable: true })
  menuId: number | null;

  @Column("int", { name: "menu_type", nullable: true })
  menuType: number | null;

  @Column("int", { name: "menu_item_link_order", nullable: true })
  menuItemLinkOrder: number | null;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.menuItemLinks)
  @JoinColumn([{ name: "item_id", referencedColumnName: "itemId" }])
  item: MenuItem;
}
