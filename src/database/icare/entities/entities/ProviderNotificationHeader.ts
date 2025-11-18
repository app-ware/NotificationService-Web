import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK__Provider__E059842FF11A6824", ["notificationId"], { unique: true })
@Entity("Provider_Notification_Header", { schema: "dbo" })
export class ProviderNotificationHeader {
  @PrimaryGeneratedColumn({ type: "int", name: "notification_id" })
  notificationId: number;

  @Column("nvarchar", { name: "notification_text" })
  notificationText: string;

  @Column("nvarchar", { name: "notification_text_formatted", nullable: true })
  notificationTextFormatted: string | null;

  @Column("nvarchar", {
    name: "notification_icon",
    nullable: true,
    length: 200,
  })
  notificationIcon: string | null;

  @Column("datetime", { name: "notification_date", default: () => "getdate()" })
  notificationDate: Date;

  @Column("bit", { name: "is_deleted", default: () => "(0)" })
  isDeleted: boolean;

  @Column("nvarchar", { name: "notification_title", nullable: true })
  notificationTitle: string | null;

  @ManyToOne(
    () => CareCenter,
    (careCenter) => careCenter.providerNotificationHeaders
  )
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
