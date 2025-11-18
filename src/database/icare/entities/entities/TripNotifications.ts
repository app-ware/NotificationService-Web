import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Trip_Not__6495C308BE1F42EC", ["tripNotificationId"], {
  unique: true,
})
@Entity("Trip_Notifications", { schema: "dbo" })
export class TripNotifications {
  @PrimaryGeneratedColumn({ type: "int", name: "trip_notification_id" })
  tripNotificationId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "trip_type", nullable: true })
  tripType: number | null;

  @Column("int", { name: "child_trip_status", nullable: true })
  childTripStatus: number | null;

  @Column("nvarchar", { name: "notification_text", nullable: true })
  notificationText: string | null;

  @Column("bit", { name: "do_notify", nullable: true })
  doNotify: boolean | null;
}
