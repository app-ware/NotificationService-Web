import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("schedule_id", ["scheduleId"], {})
@Entity("Schedule_Item_link", { schema: "dbo" })
export class ScheduleItemLink {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "Schedule_ID", nullable: true })
  scheduleId: number | null;

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
