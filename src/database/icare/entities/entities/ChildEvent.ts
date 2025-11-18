import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("child_id", ["childId"], {})
@Index("childEventKey", ["eventId", "childId"], { unique: true })
@Entity("Child_Event", { schema: "dbo" })
export class ChildEvent {
  @PrimaryGeneratedColumn({ type: "int", name: "event_child_id" })
  eventChildId: number;

  @Column("int", { primary: true, name: "event_id" })
  eventId: number;

  @Column("int", { primary: true, name: "child_id" })
  childId: number;
}
