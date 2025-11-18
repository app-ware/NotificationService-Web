import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "child_id - bus_id - trip_id - notification_date",
  ["childId", "busId", "tripId", "notificationDate"],
  {}
)
@Entity("Trip_NotificationLog", { schema: "dbo" })
export class TripNotificationLog {
  @PrimaryGeneratedColumn({ type: "int", name: "trip_notification_id" })
  tripNotificationId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "bus_id", nullable: true })
  busId: number | null;

  @Column("int", { name: "trip_id", nullable: true })
  tripId: number | null;

  @Column("float", { name: "latitude", nullable: true, precision: 53 })
  latitude: number | null;

  @Column("float", { name: "longitude", nullable: true, precision: 53 })
  longitude: number | null;

  @Column("date", { name: "notification_date", nullable: true })
  notificationDate: Date | null;

  @Column("time", { name: "notification_time", nullable: true })
  notificationTime: Date | null;

  @Column("nvarchar", { name: "notifcation_text", nullable: true })
  notifcationText: string | null;

  @Column("int", { name: "child_status", nullable: true })
  childStatus: number | null;

  @Column("bit", { name: "is_manual", nullable: true })
  isManual: boolean | null;

  @Column("bit", { name: "is_notification_enabled", nullable: true })
  isNotificationEnabled: boolean | null;
}
