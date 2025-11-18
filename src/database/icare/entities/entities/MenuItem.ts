import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenuItemLink } from "./MenuItemLink";

@Index("PK_Menu_Item", ["itemId"], { unique: true })
@Entity("Menu_Item", { schema: "dbo" })
export class MenuItem {
  @PrimaryGeneratedColumn({ type: "int", name: "item_id" })
  itemId: number;

  @Column("nvarchar", { name: "start_time", nullable: true, length: 50 })
  startTime: string | null;

  @Column("nvarchar", { name: "end_time", nullable: true, length: 50 })
  endTime: string | null;

  @Column("nvarchar", { name: "item_photo", nullable: true })
  itemPhoto: string | null;

  @Column("nvarchar", { name: "item_line_1", nullable: true })
  itemLine_1: string | null;

  @Column("nvarchar", { name: "item_line_2", nullable: true })
  itemLine_2: string | null;

  @Column("int", { name: "menu_id", nullable: true })
  menuId: number | null;

  @Column("nvarchar", { name: "title", nullable: true })
  title: string | null;

  @Column("nvarchar", { name: "title1", nullable: true })
  title1: string | null;

  @Column("nvarchar", { name: "title2", nullable: true })
  title2: string | null;

  @Column("nvarchar", { name: "item_line", nullable: true })
  itemLine: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @OneToMany(() => MenuItemLink, (menuItemLink) => menuItemLink.item)
  menuItemLinks: MenuItemLink[];
}
