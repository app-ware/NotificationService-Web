import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "center_id - center_type - os_type",
  ["centerId", "centerType", "osType"],
  { unique: true }
)
@Index("PK_Push_Notification_Auth", ["id"], { unique: true })
@Entity("Push_Notification_Auth", { schema: "dbo" })
export class PushNotificationAuth {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("int", { name: "OS_type", nullable: true })
  osType: number | null;

  @Column("nvarchar", { name: "api_key", nullable: true })
  apiKey: string | null;

  @Column("nvarchar", { name: "key_file", nullable: true })
  keyFile: string | null;

  @Column("nvarchar", { name: "key_pass", nullable: true })
  keyPass: string | null;
}
