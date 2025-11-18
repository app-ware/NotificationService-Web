import { Column, Entity, Index, OneToMany } from "typeorm";
import { CenterMenuScheduleFilling } from "./CenterMenuScheduleFilling";

@Index("PK__Menu_Sch__F4EACE1BB0C2A82A", ["optionId"], { unique: true })
@Entity("Menu_Schedule_Filling_Options", { schema: "dbo" })
export class MenuScheduleFillingOptions {
  @Column("int", { primary: true, name: "option_id" })
  optionId: number;

  @Column("nvarchar", { name: "option_name", nullable: true, length: 50 })
  optionName: string | null;

  @OneToMany(
    () => CenterMenuScheduleFilling,
    (centerMenuScheduleFilling) => centerMenuScheduleFilling.menuOption
  )
  centerMenuScheduleFillings: CenterMenuScheduleFilling[];

  @OneToMany(
    () => CenterMenuScheduleFilling,
    (centerMenuScheduleFilling) => centerMenuScheduleFilling.scheduleOption
  )
  centerMenuScheduleFillings2: CenterMenuScheduleFilling[];
}
