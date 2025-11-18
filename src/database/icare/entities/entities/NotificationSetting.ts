import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Notifica__2CEC4EFB3DD13213", ["notificationSettingId"], {
  unique: true,
})
@Index("UQ__Notifica__290A2886500098F0", ["centerId"], { unique: true })
@Entity("Notification_Setting", { schema: "dbo" })
export class NotificationSetting {
  @PrimaryGeneratedColumn({ type: "int", name: "notification_setting_id" })
  notificationSettingId: number;

  @Column("int", { name: "notification_expiry_after" })
  notificationExpiryAfter: number;

  @Column("int", { name: "center_id", unique: true })
  centerId: number;
}
