import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "child_id - date - type",
  ["childId", "transitionDate", "transitionType"],
  { unique: true }
)
@Entity("Child_TransitionLog", { schema: "dbo" })
export class ChildTransitionLog {
  @PrimaryGeneratedColumn({ type: "int", name: "transition_id" })
  transitionId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("date", { name: "transition_date", nullable: true })
  transitionDate: Date | null;

  @Column("time", { name: "transition_time", nullable: true })
  transitionTime: Date | null;

  @Column("int", { name: "transition_type", nullable: true })
  transitionType: number | null;

  @Column("nvarchar", { name: "notification_text", nullable: true })
  notificationText: string | null;

  @Column("int", { name: "notification_status", nullable: true })
  notificationStatus: number | null;
}
