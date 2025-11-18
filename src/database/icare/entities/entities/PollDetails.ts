import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterPolls } from "./CenterPolls";
import { PollOptions } from "./PollOptions";

@Index("PK_Poll_Details", ["id"], { unique: true })
@Entity("Poll_Details", { schema: "dbo" })
export class PollDetails {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "recipient_id", nullable: true })
  recipientId: number | null;

  @Column("datetime", { name: "response_time", nullable: true })
  responseTime: Date | null;

  @ManyToOne(() => CenterPolls, (centerPolls) => centerPolls.pollDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "center_poll_id", referencedColumnName: "centerPollId" },
  ])
  centerPoll: CenterPolls;

  @ManyToOne(() => PollOptions, (pollOptions) => pollOptions.pollDetails)
  @JoinColumn([
    { name: "poll_option_id", referencedColumnName: "pollOptionId" },
  ])
  pollOption: PollOptions;
}
