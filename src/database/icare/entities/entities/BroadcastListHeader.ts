import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BroadcastListType } from "./BroadcastListType";
import { BroadcastListLines } from "./BroadcastListLines";

@Index("PK__Broadcas__A88899BC18A20F84", ["broadcastId"], { unique: true })
@Entity("Broadcast_List_Header", { schema: "dbo" })
export class BroadcastListHeader {
  @PrimaryGeneratedColumn({ type: "int", name: "broadcast_id" })
  broadcastId: number;

  @Column("nvarchar", { name: "broadcast_name", nullable: true })
  broadcastName: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @ManyToOne(
    () => BroadcastListType,
    (broadcastListType) => broadcastListType.broadcastListHeaders
  )
  @JoinColumn([
    { name: "broadcast_type_id", referencedColumnName: "broadcastTypeId" },
  ])
  broadcastType: BroadcastListType;

  @OneToMany(
    () => BroadcastListLines,
    (broadcastListLines) => broadcastListLines.broadcast
  )
  broadcastListLines: BroadcastListLines[];
}
