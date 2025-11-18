import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("temp_class_event", { schema: "dbo" })
export class TempClassEvent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("int", { name: "event_id", nullable: true })
  eventId: number | null;
}
