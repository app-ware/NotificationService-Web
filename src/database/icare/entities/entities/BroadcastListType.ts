import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BroadcastListHeader } from "./BroadcastListHeader";

@Index("PK__Broadcas__CCD32DA8F83198D8", ["broadcastTypeId"], { unique: true })
@Entity("Broadcast_List_Type", { schema: "dbo" })
export class BroadcastListType {
  @PrimaryGeneratedColumn({ type: "int", name: "broadcast_type_id" })
  broadcastTypeId: number;

  @Column("nvarchar", { name: "broadcast_type_name", nullable: true })
  broadcastTypeName: string | null;

  @OneToMany(
    () => BroadcastListHeader,
    (broadcastListHeader) => broadcastListHeader.broadcastType
  )
  broadcastListHeaders: BroadcastListHeader[];
}
