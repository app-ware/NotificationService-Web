import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Food_photo", ["id"], { unique: true })
@Entity("Food_photo", { schema: "dbo" })
export class FoodPhoto {

  @PrimaryGeneratedColumn("increment", { name: "ID" })
  id: number;
  @Column("nvarchar", { name: "food_name", nullable: true })
  foodName: string | null;

  @Column("nvarchar", { name: "FileName", nullable: true, length: 50 })
  fileName: string | null;

  @Column("numeric", {
    name: "center_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  centerId: number | null;

  @Column("int", { name: "status_order", nullable: true })
  statusOrder: number | null;
}
