import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__FoodMenu__C20241DC15E6AFFC", ["foodMenuTypeId"], { unique: true })
@Entity("FoodMenu_Type", { schema: "dbo" })
export class FoodMenuType {
  @PrimaryGeneratedColumn({ type: "int", name: "food_menu_type_id" })
  foodMenuTypeId: number;

  @Column("nvarchar", { name: "food_menu_type_desc", nullable: true })
  foodMenuTypeDesc: string | null;
}
