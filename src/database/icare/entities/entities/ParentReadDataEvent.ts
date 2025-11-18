import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./Event";
import { Child } from "./Child";

@Index("child_id-event_id", ["eventId", "childId"], { unique: true })
@Index("PK_Parent_Read_Data_Event", ["id"], { unique: true })
@Entity("Parent_Read_Data_Event", { schema: "dbo" })
export class ParentReadDataEvent {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "event_id", nullable: true })
  eventId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Event, (event) => event.parentReadDataEvents, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "eventId" }])
  event: Event;

  @ManyToOne(() => Child, (child) => child.parentReadDataEvents, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
