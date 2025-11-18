import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity("temp_class_event_bkp", { schema: "dbo" })
export class TempClassEventBkp {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("int", { name: "event_id", nullable: true })
  eventId: number | null;
}
