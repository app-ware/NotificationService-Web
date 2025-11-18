import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChildDailyLog } from "./ChildDailyLog";
import { Child } from "./Child";

@Index("PK_Parent_Read_Data_Daily_Log", ["id"], { unique: true })
@Entity("Parent_Read_Data_Daily_Log", { schema: "dbo" })
export class ParentReadDataDailyLog {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(
    () => ChildDailyLog,
    (childDailyLog) => childDailyLog.parentReadDataDailyLogs
  )
  @JoinColumn([{ name: "log_item_id", referencedColumnName: "logItemId" }])
  logItem: ChildDailyLog;

  @ManyToOne(() => Child, (child) => child.parentReadDataDailyLogs, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
