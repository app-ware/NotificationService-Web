import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Schedule__3214EC271D25A214", ["id"], { unique: true })
@Entity("Schedule_Lines", { schema: "dbo" })
export class ScheduleLines {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Schedule_ID", nullable: true })
  scheduleId: number | null;

  @Column("datetime", { name: "schedule_date_from", nullable: true })
  scheduleDateFrom: Date | null;

  @Column("datetime", { name: "schedule_date_to", nullable: true })
  scheduleDateTo: Date | null;
}
