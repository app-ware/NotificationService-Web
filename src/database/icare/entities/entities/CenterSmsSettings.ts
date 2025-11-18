import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK_Center_SMS_Settings", ["id"], { unique: true })
@Entity("Center_SMS_Settings", { schema: "dbo" })
export class CenterSmsSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "account_sid", nullable: true, length: 100 })
  accountSid: string | null;

  @Column("nvarchar", { name: "auth_token", nullable: true, length: 100 })
  authToken: string | null;

  @Column("nvarchar", {
    name: "messaging_service",
    nullable: true,
    length: 100,
  })
  messagingService: string | null;

  @Column("nvarchar", {
    name: "active_phone_number",
    nullable: true,
    length: 50,
  })
  activePhoneNumber: string | null;

  @Column("nvarchar", { name: "from_title", nullable: true, length: 20 })
  fromTitle: string | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.centerSmsSettings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
