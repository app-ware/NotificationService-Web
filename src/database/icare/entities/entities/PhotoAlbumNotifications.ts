import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Photo_Album_Notifications", ["albumNotificationId"], {
  unique: true,
})
@Entity("Photo_Album_Notifications", { schema: "dbo" })
export class PhotoAlbumNotifications {
  @PrimaryGeneratedColumn({ type: "int", name: "album_notification_id" })
  albumNotificationId: number;

  @Column("int", { name: "album_id", nullable: true })
  albumId: number | null;

  @Column("nvarchar", { name: "album_notification_text", nullable: true })
  albumNotificationText: string | null;

  @Column("bit", { name: "is_active", nullable: true })
  isActive: boolean | null;
}
