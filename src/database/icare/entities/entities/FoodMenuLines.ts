import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Food_Men__3214EC275DA7CD8D", ["id"], { unique: true })
@Entity("Food_Menu_Lines", { schema: "dbo" })
export class FoodMenuLines {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "menu_id", nullable: true })
  menuId: number | null;

  @Column("datetime", { name: "menu_date_from", nullable: true })
  menuDateFrom: Date | null;

  @Column("datetime", { name: "menu_date_to", nullable: true })
  menuDateTo: Date | null;
}
