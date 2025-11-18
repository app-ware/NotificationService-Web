import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Class_Menu", ["classMenuId"], { unique: true })
@Entity("Class_Menu", { schema: "dbo" })
export class ClassMenu {
  @PrimaryGeneratedColumn({ type: "int", name: "class_menu_id" })
  classMenuId: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("int", { name: "menu_id", nullable: true })
  menuId: number | null;
}
