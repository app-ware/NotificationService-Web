import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Weekdays } from "./Weekdays";
import { FoodMenu } from "./FoodMenu";

@Index("food_menu_id", ["scheduleMenuId", "foodMenuId"], {})
@Index("PK__Schedule__3FBA1971FF4DEAB6", ["scheduleMenuId"], { unique: true })
@Entity("Scheduled_FoodMenu", { schema: "dbo" })
export class ScheduledFoodMenu {
  @PrimaryGeneratedColumn({ type: "int", name: "schedule_menu_id" })
  scheduleMenuId: number;

  @Column("int", { name: "food_menu_id", nullable: true })
  foodMenuId: number | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @ManyToOne(() => Weekdays, (weekdays) => weekdays.scheduledFoodMenus)
  @JoinColumn([{ name: "weekday_id", referencedColumnName: "weekdayId" }])
  weekday: Weekdays;

  @ManyToOne(() => FoodMenu, (foodMenu) => foodMenu.scheduledFoodMenus)
  @JoinColumn([{ name: "food_menu_id", referencedColumnName: "foodMenuId" }])
  foodMenu: FoodMenu;
}
