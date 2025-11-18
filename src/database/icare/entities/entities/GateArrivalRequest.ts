import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";
import { Parent } from "./Parent";
import { GateArrivalRequestStatus } from "./GateArrivalRequestStatus";
import { GateArrivalRequestChildMapping } from "./GateArrivalRequestChildMapping";
import { GateArrivalRequestLog } from "./GateArrivalRequestLog";

@Index("PK__Gate_Arr__18D3B90F33AE0604", ["requestId"], { unique: true })
@Entity("Gate_Arrival_Request", { schema: "dbo" })
export class GateArrivalRequest {
  @PrimaryGeneratedColumn({ type: "int", name: "request_id" })
  requestId: number;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "lng", nullable: true, precision: 53 })
  lng: number | null;

  @Column("bit", {
    name: "notification_sent",
    nullable: true,
    default: () => "(0)",
  })
  notificationSent: boolean | null;

  @Column("datetime", {
    name: "creation_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationTime: Date | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.gateArrivalRequests)
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;

  @ManyToOne(() => Parent, (parent) => parent.gateArrivalRequests)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "parentId" }])
  parent: Parent;

  @ManyToOne(
    () => GateArrivalRequestStatus,
    (gateArrivalRequestStatus) => gateArrivalRequestStatus.gateArrivalRequests
  )
  @JoinColumn([{ name: "status_id", referencedColumnName: "statusId" }])
  status: GateArrivalRequestStatus;

  @OneToMany(
    () => GateArrivalRequestChildMapping,
    (gateArrivalRequestChildMapping) => gateArrivalRequestChildMapping.request
  )
  gateArrivalRequestChildMappings: GateArrivalRequestChildMapping[];

  @OneToMany(
    () => GateArrivalRequestLog,
    (gateArrivalRequestLog) => gateArrivalRequestLog.request
  )
  gateArrivalRequestLogs: GateArrivalRequestLog[];
}
