import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BroadcastListHeader } from "./BroadcastListHeader";

@Index("PK__Broadcas__4C9D024356110DF5", ["broadcastLineId"], { unique: true })
@Entity("Broadcast_List_Lines", { schema: "dbo" })
export class BroadcastListLines {
  @PrimaryGeneratedColumn({ type: "int", name: "broadcast_line_id" })
  broadcastLineId: number;

  @Column("int", { name: "Doc_ID", nullable: true })
  docId: number | null;

  @ManyToOne(
    () => BroadcastListHeader,
    (broadcastListHeader) => broadcastListHeader.broadcastListLines
  )
  @JoinColumn([{ name: "broadcast_id", referencedColumnName: "broadcastId" }])
  broadcast: BroadcastListHeader;
}
