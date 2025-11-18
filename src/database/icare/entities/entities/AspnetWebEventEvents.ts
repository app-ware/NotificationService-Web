import { Column, Entity, Index } from "typeorm";

@Index("PK__aspnet_W__7944C8100723C807", ["eventId"], { unique: true })
@Entity("aspnet_WebEvent_Events", { schema: "dbo" })
export class AspnetWebEventEvents {
  @Column("char", { primary: true, name: "EventId", length: 32 })
  eventId: string;

  @Column("datetime", { name: "EventTimeUtc" })
  eventTimeUtc: Date;

  @Column("datetime", { name: "EventTime" })
  eventTime: Date;

  @Column("nvarchar", { name: "EventType", length: 256 })
  eventType: string;

  @Column("decimal", { name: "EventSequence", precision: 19, scale: 0 })
  eventSequence: number;

  @Column("decimal", { name: "EventOccurrence", precision: 19, scale: 0 })
  eventOccurrence: number;

  @Column("int", { name: "EventCode" })
  eventCode: number;

  @Column("int", { name: "EventDetailCode" })
  eventDetailCode: number;

  @Column("nvarchar", { name: "Message", nullable: true, length: 1024 })
  message: string | null;

  @Column("nvarchar", { name: "ApplicationPath", nullable: true, length: 256 })
  applicationPath: string | null;

  @Column("nvarchar", {
    name: "ApplicationVirtualPath",
    nullable: true,
    length: 256,
  })
  applicationVirtualPath: string | null;

  @Column("nvarchar", { name: "MachineName", length: 256 })
  machineName: string;

  @Column("nvarchar", { name: "RequestUrl", nullable: true, length: 1024 })
  requestUrl: string | null;

  @Column("nvarchar", { name: "ExceptionType", nullable: true, length: 256 })
  exceptionType: string | null;

  @Column("ntext", { name: "Details", nullable: true })
  details: string | null;
}
