import { Column, Entity, Index, OneToMany } from "typeorm";
import { CenterDailyLogVariants } from "./CenterDailyLogVariants";

@Index("PK_Daily_Log_Items", ["logItemId"], { unique: true })
@Entity("Daily_Log_Items", { schema: "dbo" })
export class DailyLogItems {
  @Column("int", { primary: true, name: "log_item_id" })
  logItemId: number;

  @Column("nvarchar", { name: "log_item_title", nullable: true, length: 50 })
  logItemTitle: string | null;

  @Column("nvarchar", { name: "log_item_variables", nullable: true })
  logItemVariables: string | null;

  @OneToMany(
    () => CenterDailyLogVariants,
    (centerDailyLogVariants) => centerDailyLogVariants.logItem
  )
  centerDailyLogVariants: CenterDailyLogVariants[];
}
