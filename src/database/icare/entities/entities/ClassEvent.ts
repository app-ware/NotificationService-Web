import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Class_Event", ["classEventId"], { unique: true })
@Entity("Class_Event", { schema: "dbo" })
export class ClassEvent {
  @PrimaryGeneratedColumn({ type: "int", name: "class_event_id" })
  classEventId: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("int", { name: "event_id", nullable: true })
  eventId: number | null;
}
