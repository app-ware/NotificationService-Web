import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("broadcast_date", ["broadcastDate"], {})
@Index("class_id", ["classId"], {})
@Index("PK__Class_Br__A88899BC9775A5C9", ["broadcastId"], { unique: true })
@Entity("Class_Broadcast", { schema: "dbo" })
export class ClassBroadcast {
  @PrimaryGeneratedColumn({ type: "int", name: "broadcast_id" })
  broadcastId: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("nvarchar", { name: "broadcast_text", nullable: true })
  broadcastText: string | null;

  @Column("nvarchar", { name: "broadcast_text1", nullable: true })
  broadcastText1: string | null;

  @Column("nvarchar", { name: "broadcast_text2", nullable: true })
  broadcastText2: string | null;

  @Column("date", { name: "broadcast_date", nullable: true })
  broadcastDate: Date | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @Column("datetime", {
    name: "last_update",
    nullable: true,
    default: () => "getutcdate()",
  })
  lastUpdate: Date | null;
}
