import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("child_id", ["childId"], {})
@Index("child_id-INCLUDE-Notification_ID", ["notificationId", "childId"], {})
@Index("Notification_ID", ["notificationId"], {})
@Index("PK__Notifica__3214EC27EB554EBB", ["id"], { unique: true })
@Entity("Notification_Detail", { schema: "dbo" })
export class NotificationDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Notification_ID", nullable: true })
  notificationId: number | null;

  @Column("int", { name: "Child_ID", nullable: true })
  childId: number | null;
}
