import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { GateArrivalRequest } from "./GateArrivalRequest";

@Index("PK__Gate_Arr__97D53319A0C9FD8E", ["requestChildId"], { unique: true })
@Entity("Gate_Arrival_Request_Child_Mapping", { schema: "dbo" })
export class GateArrivalRequestChildMapping {
  @PrimaryGeneratedColumn({ type: "int", name: "request_child_id" })
  requestChildId: number;

  @ManyToOne(() => Child, (child) => child.gateArrivalRequestChildMappings)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => GateArrivalRequest,
    (gateArrivalRequest) => gateArrivalRequest.gateArrivalRequestChildMappings
  )
  @JoinColumn([{ name: "request_id", referencedColumnName: "requestId" }])
  request: GateArrivalRequest;
}
