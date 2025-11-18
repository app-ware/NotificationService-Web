import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EventResponse } from "./EventResponse";
import { ParentReadDataEvent } from "./ParentReadDataEvent";

@Index("center_id-event_date-deleted", ["centerId", "eventDate", "deleted"], {})
@Index("PK_Event", ["eventId"], { unique: true })
@Entity("Event", { schema: "dbo" })
export class Event {
  @PrimaryGeneratedColumn({ type: "int", name: "event_id" })
  eventId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("date", { name: "event_date", nullable: true })
  eventDate: Date | null;

  @Column("nvarchar", { name: "event_start_time", nullable: true, length: 50 })
  eventStartTime: string | null;

  @Column("nvarchar", { name: "event_end_time", nullable: true, length: 50 })
  eventEndTime: string | null;

  @Column("nvarchar", { name: "event_cost", nullable: true })
  eventCost: string | null;

  @Column("nvarchar", { name: "event_photo", nullable: true })
  eventPhoto: string | null;

  @Column("nvarchar", { name: "event_title", nullable: true })
  eventTitle: string | null;

  @Column("nvarchar", { name: "event_location", nullable: true })
  eventLocation: string | null;

  @Column("nvarchar", { name: "event_requirements", nullable: true })
  eventRequirements: string | null;

  @Column("nvarchar", {
    name: "event_transportation",
    nullable: true,
    length: 500,
  })
  eventTransportation: string | null;

  @Column("nvarchar", { name: "event_Description", nullable: true })
  eventDescription: string | null;

  @Column("nvarchar", { name: "event_title1", nullable: true })
  eventTitle1: string | null;

  @Column("nvarchar", { name: "event_location1", nullable: true })
  eventLocation1: string | null;

  @Column("nvarchar", { name: "event_requirements1", nullable: true })
  eventRequirements1: string | null;

  @Column("nvarchar", { name: "event_transportation1", nullable: true })
  eventTransportation1: string | null;

  @Column("nvarchar", { name: "event_Description1", nullable: true })
  eventDescription1: string | null;

  @Column("nvarchar", { name: "event_title2", nullable: true })
  eventTitle2: string | null;

  @Column("nvarchar", { name: "event_location2", nullable: true })
  eventLocation2: string | null;

  @Column("nvarchar", { name: "event_requirements2", nullable: true })
  eventRequirements2: string | null;

  @Column("nvarchar", { name: "event_transportation2", nullable: true })
  eventTransportation2: string | null;

  @Column("nvarchar", { name: "event_Description2", nullable: true })
  eventDescription2: string | null;

  @Column("bit", { name: "all_classes", nullable: true })
  allClasses: boolean | null;

  @Column("bit", { name: "deleted", nullable: true, default: () => "(0)" })
  deleted: boolean | null;

  @Column("date", { name: "event_response_dead_line", nullable: true })
  eventResponseDeadLine: Date | null;

  @Column("bit", {
    name: "is_event_active",
    nullable: true,
    default: () => "(1)",
  })
  isEventActive: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @OneToMany(() => EventResponse, (eventResponse) => eventResponse.event)
  eventResponses: EventResponse[];

  @OneToMany(
    () => ParentReadDataEvent,
    (parentReadDataEvent) => parentReadDataEvent.event
  )
  parentReadDataEvents: ParentReadDataEvent[];
}
