import { Column, Entity, Index, OneToMany } from "typeorm";
import { GateArrivalRequest } from "./GateArrivalRequest";

@Index("PK__Gate_Arr__3683B531291CA6F0", ["statusId"], { unique: true })
@Entity("Gate_Arrival_Request_Status", { schema: "dbo" })
export class GateArrivalRequestStatus {
  @Column("int", { primary: true, name: "status_id" })
  statusId: number;

  @Column("nvarchar", { name: "status_name", nullable: true, length: 50 })
  statusName: string | null;

  @OneToMany(
    () => GateArrivalRequest,
    (gateArrivalRequest) => gateArrivalRequest.status
  )
  gateArrivalRequests: GateArrivalRequest[];
}
