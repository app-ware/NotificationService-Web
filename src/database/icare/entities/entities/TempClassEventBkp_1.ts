import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("temp_class_event_bkp_1", { schema: "dbo" })
export class TempClassEventBkp_1 {
  @PrimaryGeneratedColumn({ type: "int", name: "class_event_id" })
  classEventId: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("int", { name: "event_id", nullable: true })
  eventId: number | null;
}
