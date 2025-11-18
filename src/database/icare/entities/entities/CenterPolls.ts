import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";
import { ParentReadDataPolls } from "./ParentReadDataPolls";
import { PollDetails } from "./PollDetails";
import { PollOptions } from "./PollOptions";

@Index("PK_Center_Polls", ["centerPollId"], { unique: true })
@Entity("Center_Polls", { schema: "dbo" })
export class CenterPolls {
  @PrimaryGeneratedColumn({ type: "int", name: "center_poll_id" })
  centerPollId: number;

  @Column("nvarchar", { name: "poll_title", nullable: true })
  pollTitle: string | null;

  @Column("nvarchar", { name: "poll_text", nullable: true })
  pollText: string | null;

  @Column("int", { name: "recipient_type", nullable: true })
  recipientType: number | null;

  @Column("date", { name: "poll_deadline_date", nullable: true })
  pollDeadlineDate: Date | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.centerPolls, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;

  @OneToMany(
    () => ParentReadDataPolls,
    (parentReadDataPolls) => parentReadDataPolls.centerPoll
  )
  parentReadDataPolls: ParentReadDataPolls[];

  @OneToMany(() => PollDetails, (pollDetails) => pollDetails.centerPoll)
  pollDetails: PollDetails[];

  @OneToMany(() => PollOptions, (pollOptions) => pollOptions.centerPoll)
  pollOptions: PollOptions[];
}
