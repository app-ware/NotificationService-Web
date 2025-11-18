import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("katha", { schema: "dbo" })
export class Katha {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "event_id", nullable: true })
  eventId: number | null;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;
}
