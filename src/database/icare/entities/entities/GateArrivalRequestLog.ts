import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GateArrivalRequest } from "./GateArrivalRequest";

@Index("PK__Gate_Arr__2D26E7AE87F16D34", ["logId"], { unique: true })
@Entity("Gate_Arrival_Request_Log", { schema: "dbo" })
export class GateArrivalRequestLog {
  @PrimaryGeneratedColumn({ type: "int", name: "Log_ID" })
  logId: number;

  @Column("datetime", {
    name: "Date_Log",
    nullable: true,
    default: () => "getutcdate()",
  })
  dateLog: Date | null;

  @Column("int", { name: "Status_ID", nullable: true })
  statusId: number | null;

  @Column("bit", {
    name: "Notification_Sent",
    nullable: true,
    default: () => "(0)",
  })
  notificationSent: boolean | null;

  @ManyToOne(
    () => GateArrivalRequest,
    (gateArrivalRequest) => gateArrivalRequest.gateArrivalRequestLogs
  )
  @JoinColumn([{ name: "Request_ID", referencedColumnName: "requestId" }])
  request: GateArrivalRequest;
}
