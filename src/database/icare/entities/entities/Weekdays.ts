import { Column, Entity, Index, OneToMany } from "typeorm";
import { ClassAgendaItems } from "./ClassAgendaItems";
import { ClassScheduleDates } from "./ClassScheduleDates";
import { DailyClassSchedule } from "./DailyClassSchedule";
import { DailyFoodMenu } from "./DailyFoodMenu";
import { FoodMenuDates } from "./FoodMenuDates";
import { ScheduledClassSchedule } from "./ScheduledClassSchedule";
import { ScheduledFoodMenu } from "./ScheduledFoodMenu";

@Index("PK_Weekdays", ["weekdayId"], { unique: true })
@Entity("Weekdays", { schema: "dbo" })
export class Weekdays {
  @Column("int", { primary: true, name: "weekday_id" })
  weekdayId: number;

  @Column("nvarchar", { name: "weekday_name", nullable: true, length: 150 })
  weekdayName: string | null;

  @Column("int", { name: "weekday_order", nullable: true })
  weekdayOrder: number | null;

  @OneToMany(
    () => ClassAgendaItems,
    (classAgendaItems) => classAgendaItems.weekday
  )
  classAgendaItems: ClassAgendaItems[];

  @OneToMany(
    () => ClassScheduleDates,
    (classScheduleDates) => classScheduleDates.weekday
  )
  classScheduleDates: ClassScheduleDates[];

  @OneToMany(
    () => DailyClassSchedule,
    (dailyClassSchedule) => dailyClassSchedule.weekday
  )
  dailyClassSchedules: DailyClassSchedule[];

  @OneToMany(() => DailyFoodMenu, (dailyFoodMenu) => dailyFoodMenu.weekday)
  dailyFoodMenus: DailyFoodMenu[];

  @OneToMany(() => FoodMenuDates, (foodMenuDates) => foodMenuDates.weekday)
  foodMenuDates: FoodMenuDates[];

  @OneToMany(
    () => ScheduledClassSchedule,
    (scheduledClassSchedule) => scheduledClassSchedule.weekday
  )
  scheduledClassSchedules: ScheduledClassSchedule[];

  @OneToMany(
    () => ScheduledFoodMenu,
    (scheduledFoodMenu) => scheduledFoodMenu.weekday
  )
  scheduledFoodMenus: ScheduledFoodMenu[];
}
