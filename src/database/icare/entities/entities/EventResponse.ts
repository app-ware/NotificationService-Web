import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { Event } from "./Event";

@Index("event_id", ["eventId"], {})
@Index("event_id-child_id", ["eventId", "childId"], { unique: true })
@Index("PK_Event_Response", ["responseId"], { unique: true })
@Entity("Event_Response", { schema: "dbo" })
export class EventResponse {
  @PrimaryGeneratedColumn({ type: "int", name: "response_id" })
  responseId: number;

  @Column("int", { name: "event_id", nullable: true })
  eventId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", { name: "response_date_time", nullable: true })
  responseDateTime: Date | null;

  @Column("int", { name: "is_participating", nullable: true })
  isParticipating: number | null;

  @Column("bit", { name: "is_payment_collected", nullable: true })
  isPaymentCollected: boolean | null;

  @ManyToOne(() => Child, (child) => child.eventResponses, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(() => Event, (event) => event.eventResponses, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "eventId" }])
  event: Event;
}
