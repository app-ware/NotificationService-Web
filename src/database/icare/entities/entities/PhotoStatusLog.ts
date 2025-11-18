import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Photo_St__AE276CB0C2A37B88", ["photoStatusLogId"], { unique: true })
@Entity("Photo_Status_Log", { schema: "dbo" })
export class PhotoStatusLog {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_status_log_id" })
  photoStatusLogId: number;

  @Column("int", { name: "photo_id" })
  photoId: number;

  @Column("int", { name: "userid" })
  userid: number;

  @Column("int", { name: "user_type" })
  userType: number;

  @Column("int", { name: "log_type" })
  logType: number;

  @Column("nvarchar", { name: "log_text", nullable: true, length: 500 })
  logText: string | null;

  @Column("datetime", {
    name: "log_date",
    nullable: true,
    default: () => "getdate()",
  })
  logDate: Date | null;
}
