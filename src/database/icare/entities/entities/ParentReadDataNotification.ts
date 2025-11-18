import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { NotificationHeader } from "./NotificationHeader";

@Index("child_id-notification_id", ["notificationId", "childId"], {
  unique: true,
})
@Index("PK_Parent_Read_Data_Notification", ["id"], { unique: true })
@Entity("Parent_Read_Data_Notification", { schema: "dbo" })
export class ParentReadDataNotification {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "notification_id", nullable: true })
  notificationId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Child, (child) => child.parentReadDataNotifications, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => NotificationHeader,
    (notificationHeader) => notificationHeader.parentReadDataNotifications,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "notification_id", referencedColumnName: "notificationId" },
  ])
  notification: NotificationHeader;
}
