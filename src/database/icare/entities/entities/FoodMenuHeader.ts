import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Food_Menu_Header", ["menuId"], { unique: true })
@Entity("Food_Menu_Header", { schema: "dbo" })
export class FoodMenuHeader {
  @PrimaryGeneratedColumn({ type: "int", name: "menu_id" })
  menuId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "menu_descriprion", nullable: true })
  menuDescriprion: string | null;

  @Column("nvarchar", { name: "menu_descriprion1", nullable: true })
  menuDescriprion1: string | null;

  @Column("nvarchar", { name: "menu_descriprion2", nullable: true })
  menuDescriprion2: string | null;

  @Column("nvarchar", { name: "assigned_classes", nullable: true })
  assignedClasses: string | null;

  @Column("nvarchar", { name: "menu_items", nullable: true })
  menuItems: string | null;

  @Column("int", { name: "occurs_every", nullable: true })
  occursEvery: number | null;

  @Column("int", { name: "Interval", nullable: true })
  interval: number | null;

  @Column("bit", { name: "deleted", nullable: true })
  deleted: boolean | null;

  @Column("int", { name: "parent_menu_id", nullable: true })
  parentMenuId: number | null;
}
