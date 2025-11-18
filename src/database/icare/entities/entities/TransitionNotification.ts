import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("center_id - transition_type", ["centerId", "transitionType"], {
  unique: true,
})
@Index("PK__Transiti__606FEB763B453FFC", ["transitionNotificationId"], {
  unique: true,
})
@Entity("Transition_Notification", { schema: "dbo" })
export class TransitionNotification {
  @PrimaryGeneratedColumn({ type: "int", name: "transition_notification_id" })
  transitionNotificationId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "transition_type", nullable: true })
  transitionType: number | null;

  @Column("nvarchar", { name: "notification_text", nullable: true })
  notificationText: string | null;

  @Column("bit", { name: "do_notify", nullable: true })
  doNotify: boolean | null;
}
