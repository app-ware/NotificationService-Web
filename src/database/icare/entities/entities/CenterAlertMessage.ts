import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK__Center_A__44C9BFF00D85FE6F", ["alertMessageId"], { unique: true })
@Index("UQ__Center_A__290A288671DAE461", ["centerId"], { unique: true })
@Entity("Center_Alert_Message", { schema: "dbo" })
export class CenterAlertMessage {
  @PrimaryGeneratedColumn({ type: "int", name: "alert_message_id" })
  alertMessageId: number;

  @Column("int", { name: "center_id", unique: true })
  centerId: number;

  @Column("int", { name: "dealer_id" })
  dealerId: number;

  @Column("nvarchar", { name: "message_text", nullable: true, length: 250 })
  messageText: string | null;

  @Column("date", { name: "alert_expiry_date" })
  alertExpiryDate: Date;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @OneToOne(() => CareCenter, (careCenter) => careCenter.centerAlertMessage)
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
