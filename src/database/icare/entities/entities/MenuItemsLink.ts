import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("menu_items_link", { schema: "dbo" })
export class MenuItemsLink {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "Menu_ID", nullable: true })
  menuId: number | null;

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
