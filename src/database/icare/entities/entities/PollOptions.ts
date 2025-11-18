import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PollDetails } from "./PollDetails";
import { CenterPolls } from "./CenterPolls";

@Index("PK_Poll_Options", ["pollOptionId"], { unique: true })
@Entity("Poll_Options", { schema: "dbo" })
export class PollOptions {
  @PrimaryGeneratedColumn({ type: "int", name: "poll_option_id" })
  pollOptionId: number;

  @Column("nvarchar", { name: "poll_option_text", nullable: true })
  pollOptionText: string | null;

  @OneToMany(() => PollDetails, (pollDetails) => pollDetails.pollOption)
  pollDetails: PollDetails[];

  @ManyToOne(() => CenterPolls, (centerPolls) => centerPolls.pollOptions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "center_poll_id", referencedColumnName: "centerPollId" },
  ])
  centerPoll: CenterPolls;
}
