import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Child_Broadcast", ["childBroadcastId"], { unique: true })
@Entity("Child_Report_Broadcast", { schema: "dbo" })
export class ChildReportBroadcast {
  @PrimaryGeneratedColumn({ type: "int", name: "child_broadcast_id" })
  childBroadcastId: number;

  @Column("int", { name: "report_id", nullable: true })
  reportId: number | null;

  @Column("nvarchar", { name: "broadcast_text", nullable: true })
  broadcastText: string | null;

  @Column("nvarchar", { name: "broadcast_text1", nullable: true })
  broadcastText1: string | null;

  @Column("nvarchar", { name: "broadcast_text2", nullable: true })
  broadcastText2: string | null;
}
