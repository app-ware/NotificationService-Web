import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterSmsLog } from "./CenterSmsLog";
import { Parent } from "./Parent";

@Index("PK_Parent_Sms_Log", ["id"], { unique: true })
@Entity("Parent_Sms_Log", { schema: "dbo" })
export class ParentSmsLog {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "phone_number", nullable: true, length: 50 })
  phoneNumber: string | null;

  @Column("nvarchar", { name: "MessageSid", nullable: true, length: 100 })
  messageSid: string | null;

  @Column("nvarchar", { name: "message_status", nullable: true, length: 100 })
  messageStatus: string | null;

  @ManyToOne(() => CenterSmsLog, (centerSmsLog) => centerSmsLog.parentSmsLogs, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_sms_id", referencedColumnName: "centerSmsId" }])
  centerSms: CenterSmsLog;

  @ManyToOne(() => Parent, (parent) => parent.parentSmsLogs, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "parent_id", referencedColumnName: "parentId" }])
  parent: Parent;
}
