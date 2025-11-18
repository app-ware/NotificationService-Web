import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FoodMenu } from "./FoodMenu";
import { Weekdays } from "./Weekdays";

@Index("PK__Daily_Fo__42E9D98722FE79F7", ["dailyMenuId"], { unique: true })
@Entity("Daily_FoodMenu", { schema: "dbo" })
export class DailyFoodMenu {
  @PrimaryGeneratedColumn({ type: "int", name: "daily_menu_id" })
  dailyMenuId: number;

  @ManyToOne(() => FoodMenu, (foodMenu) => foodMenu.dailyFoodMenus)
  @JoinColumn([{ name: "food_menu_id", referencedColumnName: "foodMenuId" }])
  foodMenu: FoodMenu;

  @ManyToOne(() => Weekdays, (weekdays) => weekdays.dailyFoodMenus)
  @JoinColumn([{ name: "weekday_id", referencedColumnName: "weekdayId" }])
  weekday: Weekdays;
}
