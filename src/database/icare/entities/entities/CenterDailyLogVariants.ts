import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";
import { DailyLogItems } from "./DailyLogItems";

@Index("PK_Daily_Log_Variants", ["dailyLogVariantId"], { unique: true })
@Entity("Center_Daily_Log_Variants", { schema: "dbo" })
export class CenterDailyLogVariants {
  @PrimaryGeneratedColumn({ type: "int", name: "daily_log_variant_id" })
  dailyLogVariantId: number;

  @Column("int", { name: "log_item_value", nullable: true })
  logItemValue: number | null;

  @Column("nvarchar", { name: "daily_log_variant_text", nullable: true })
  dailyLogVariantText: string | null;

  @ManyToOne(
    () => CareCenter,
    (careCenter) => careCenter.centerDailyLogVariants,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;

  @ManyToOne(
    () => DailyLogItems,
    (dailyLogItems) => dailyLogItems.centerDailyLogVariants,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "log_item_id", referencedColumnName: "logItemId" }])
  logItem: DailyLogItems;
}
