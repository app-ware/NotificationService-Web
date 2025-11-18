import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParentReadDataNotification } from "./ParentReadDataNotification";

@Index(
  "CenterID-CreationDate-is_deleted-INCLUDE-MULTIPLE",
  [
    "notificationId",
    "notificationMessage",
    "notificationMessageFormatted",
    "notificationIcon",
    "notificationExpiryDate",
    "centerId",
    "creationDate",
    "isDeleted",
  ],
  {}
)
@Index("CreationDate", ["creationDate"], {})
@Index("PK__Notifica__8C1160B544496801", ["notificationId"], { unique: true })
@Entity("Notification_Header", { schema: "dbo" })
export class NotificationHeader {
  @PrimaryGeneratedColumn({ type: "int", name: "Notification_ID" })
  notificationId: number;

  @Column("int", { name: "CenterID", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "Notification_Message", nullable: true })
  notificationMessage: string | null;

  @Column("nvarchar", {
    name: "Notification_Message_Formatted",
    nullable: true,
  })
  notificationMessageFormatted: string | null;

  @Column("nvarchar", {
    name: "Notification_Icon",
    nullable: true,
    length: 200,
  })
  notificationIcon: string | null;

  @Column("datetime", { name: "CreationDate", nullable: true })
  creationDate: Date | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("date", { name: "Notification_Expiry_Date", nullable: true })
  notificationExpiryDate: Date | null;

  @Column("nvarchar", { name: "notification_title", nullable: true })
  notificationTitle: string | null;

  @OneToMany(
    () => ParentReadDataNotification,
    (parentReadDataNotification) => parentReadDataNotification.notification
  )
  parentReadDataNotifications: ParentReadDataNotification[];
}
