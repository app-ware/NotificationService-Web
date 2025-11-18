import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { MenuImage } from "./MenuImage";

@Index("child_id-menu_id", ["menuId", "childId"], { unique: true })
@Index("PK_Parent_Read_Data_Menu", ["id"], { unique: true })
@Entity("Parent_Read_Data_Menu", { schema: "dbo" })
export class ParentReadDataMenu {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "menu_id", nullable: true })
  menuId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Child, (child) => child.parentReadDataMenus, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(() => MenuImage, (menuImage) => menuImage.parentReadDataMenus, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "menu_id", referencedColumnName: "id" }])
  menu: MenuImage;
}
