import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Payment___B8C203123F74F004", ["paymentNotificationId"], {
  unique: true,
})
@Entity("Payment_Notification", { schema: "dbo" })
export class PaymentNotification {
  @PrimaryGeneratedColumn({ type: "int", name: "payment_notification_id" })
  paymentNotificationId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "payment_notification_type", nullable: true })
  paymentNotificationType: number | null;

  @Column("nvarchar", { name: "notification_text", nullable: true })
  notificationText: string | null;

  @Column("bit", { name: "do_notify", nullable: true })
  doNotify: boolean | null;
}
