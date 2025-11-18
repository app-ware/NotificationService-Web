import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";
import { SecUsers } from "./SecUsers";
import { ParentSmsLog } from "./ParentSmsLog";

@Index("PK_Center_Sms_Log", ["centerSmsId"], { unique: true })
@Entity("Center_Sms_Log", { schema: "dbo" })
export class CenterSmsLog {
  @PrimaryGeneratedColumn({ type: "int", name: "center_sms_id" })
  centerSmsId: number;

  @Column("nvarchar", { name: "message_text", nullable: true })
  messageText: string | null;

  @Column("datetime", {
    name: "sent_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  sentTime: Date | null;

  @Column("nvarchar", { name: "service_id", nullable: true, length: 250 })
  serviceId: string | null;

  @Column("nvarchar", { name: "notification_id", nullable: true, length: 250 })
  notificationId: string | null;

  @Column("nvarchar", { name: "message_api", nullable: true, length: 50 })
  messageApi: string | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.centerSmsLogs, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;

  @ManyToOne(() => SecUsers, (secUsers) => secUsers.centerSmsLogs, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: SecUsers;

  @OneToMany(() => ParentSmsLog, (parentSmsLog) => parentSmsLog.centerSms)
  parentSmsLogs: ParentSmsLog[];
}
