import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FoodMenuClassDateLink } from "./FoodMenuClassDateLink";
import { Weekdays } from "./Weekdays";

@Index("menu_date-menu_type", ["menuDate", "menuType"], {})
@Index("PK__FoodMenu__9D8BC14EC8E4F716", ["menuDateId"], { unique: true })
@Entity("FoodMenu_Dates", { schema: "dbo" })
export class FoodMenuDates {
  @PrimaryGeneratedColumn({ type: "int", name: "menu_date_id" })
  menuDateId: number;

  @Column("int", { name: "menu_id", nullable: true })
  menuId: number | null;

  @Column("date", { name: "menu_date", nullable: true })
  menuDate: Date | null;

  @Column("int", { name: "menu_type", nullable: true })
  menuType: number | null;

  @OneToMany(
    () => FoodMenuClassDateLink,
    (foodMenuClassDateLink) => foodMenuClassDateLink.menuDate
  )
  foodMenuClassDateLinks: FoodMenuClassDateLink[];

  @ManyToOne(() => Weekdays, (weekdays) => weekdays.foodMenuDates)
  @JoinColumn([{ name: "weekday_id", referencedColumnName: "weekdayId" }])
  weekday: Weekdays;
}
