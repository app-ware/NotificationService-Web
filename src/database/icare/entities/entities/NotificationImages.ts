import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "Notification_ID-INCLUDE-Notification_Image",
  ["notificationImage", "notificationId"],
  {}
)
@Index("PK__Notifica__3214EC27318C8371", ["id"], { unique: true })
@Entity("Notification_Images", { schema: "dbo" })
export class NotificationImages {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Notification_ID", nullable: true })
  notificationId: number | null;

  @Column("nvarchar", { name: "Notification_Image", nullable: true })
  notificationImage: string | null;
}
