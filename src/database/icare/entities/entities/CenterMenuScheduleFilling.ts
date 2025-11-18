import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";
import { MenuScheduleFillingOptions } from "./MenuScheduleFillingOptions";

// @Index("uk_center_menu_schedule_filling", ["centerId"], { unique: true })
@Entity("Center_Menu_Schedule_Filling", { schema: "dbo" })
export class CenterMenuScheduleFilling {
  
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;


  @Column("int", { name: "center_id", nullable: true, unique: true })
  centerId: number | null;

  @OneToOne(
    () => CareCenter,
    (careCenter) => careCenter.centerMenuScheduleFilling
  )
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;

  @ManyToOne(
    () => MenuScheduleFillingOptions,
    (menuScheduleFillingOptions) =>
      menuScheduleFillingOptions.centerMenuScheduleFillings
  )
  @JoinColumn([{ name: "menu_option_id", referencedColumnName: "optionId" }])
  menuOption: MenuScheduleFillingOptions;

  @ManyToOne(
    () => MenuScheduleFillingOptions,
    (menuScheduleFillingOptions) =>
      menuScheduleFillingOptions.centerMenuScheduleFillings2
  )
  @JoinColumn([
    { name: "schedule_option_id", referencedColumnName: "optionId" },
  ])
  scheduleOption: MenuScheduleFillingOptions;
}
