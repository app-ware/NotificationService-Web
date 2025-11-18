import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterPolls } from "./CenterPolls";

@Index("PK_Parent_Read_Data_Polls", ["id"], { unique: true })
@Index("recipient_id-center_poll_id", ["centerPollId", "recipientId"], {
  unique: true,
})
@Entity("Parent_Read_Data_Polls", { schema: "dbo" })
export class ParentReadDataPolls {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_poll_id", nullable: true })
  centerPollId: number | null;

  @Column("int", { name: "recipient_id", nullable: true })
  recipientId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(
    () => CenterPolls,
    (centerPolls) => centerPolls.parentReadDataPolls,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "center_poll_id", referencedColumnName: "centerPollId" },
  ])
  centerPoll: CenterPolls;
}
