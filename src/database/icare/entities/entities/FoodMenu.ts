import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DailyFoodMenu } from "./DailyFoodMenu";
import { FoodMenuClasses } from "./FoodMenuClasses";
import { ScheduledFoodMenu } from "./ScheduledFoodMenu";

@Index(
  "menu_type-center_id-food_menu_id",
  ["menuName", "isDeleted", "menuType", "centerId", "foodMenuId"],
  {}
)
@Index("PK__FoodMenu__26D0CA4199F7CB45", ["foodMenuId"], { unique: true })
@Entity("FoodMenu", { schema: "dbo" })
export class FoodMenu {
  @PrimaryGeneratedColumn({ type: "int", name: "food_menu_id" })
  foodMenuId: number;

  @Column("nvarchar", { name: "menu_name", nullable: true })
  menuName: string | null;

  @Column("int", { name: "occurs_every", nullable: true })
  occursEvery: number | null;

  @Column("int", { name: "Interval", nullable: true })
  interval: number | null;

  @Column("int", { name: "menu_type", nullable: true })
  menuType: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @Column("datetime", { name: "modified_date", nullable: true })
  modifiedDate: Date | null;

  @OneToMany(() => DailyFoodMenu, (dailyFoodMenu) => dailyFoodMenu.foodMenu)
  dailyFoodMenus: DailyFoodMenu[];

  @OneToMany(
    () => FoodMenuClasses,
    (foodMenuClasses) => foodMenuClasses.foodMenu
  )
  foodMenuClasses: FoodMenuClasses[];

  @OneToMany(
    () => ScheduledFoodMenu,
    (scheduledFoodMenu) => scheduledFoodMenu.foodMenu
  )
  scheduledFoodMenus: ScheduledFoodMenu[];
}
