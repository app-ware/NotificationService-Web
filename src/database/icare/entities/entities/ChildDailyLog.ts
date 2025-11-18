import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { ParentReadDataDailyLog } from "./ParentReadDataDailyLog";

@Index("log_item_date", ["logItemDate"], {})
@Index("PK_Child_Daily_Log", ["logItemId"], { unique: true })
@Entity("Child_Daily_Log", { schema: "dbo" })
export class ChildDailyLog {
  @PrimaryGeneratedColumn({ type: "int", name: "log_item_id" })
  logItemId: number;

  @Column("date", { name: "log_item_date", nullable: true })
  logItemDate: Date | null;

  @Column("nvarchar", { name: "log_item_text", nullable: true })
  logItemText: string | null;

  @Column("datetime", { name: "log_item_time", nullable: true })
  logItemTime: Date | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("datetime", { name: "deletion_time", nullable: true })
  deletionTime: Date | null;

  @ManyToOne(() => Child, (child) => child.childDailyLogs, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @OneToMany(
    () => ParentReadDataDailyLog,
    (parentReadDataDailyLog) => parentReadDataDailyLog.logItem
  )
  parentReadDataDailyLogs: ParentReadDataDailyLog[];
}
