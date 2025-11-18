import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScheduleItem } from "./ScheduleItem";

@Index(
  "classSchedule_id-classSchedule_type-INCLUDE-item_id-classSchedule_item_link_order",
  [
    "itemId",
    "classScheduleItemLinkOrder",
    "classScheduleId",
    "classScheduleType",
  ],
  {}
)
@Index(
  "classSchedule_type-INCLUDE-item_id-classSchedule_id-classSchedule_item_link_order",
  [
    "itemId",
    "classScheduleId",
    "classScheduleItemLinkOrder",
    "classScheduleType",
  ],
  {}
)
@Index("PK__ClassSch__C64475E247CD2926", ["classScheduleItemLinkId"], {
  unique: true,
})
@Entity("ClassSchedule_Item_Link", { schema: "dbo" })
export class ClassScheduleItemLink {
  @PrimaryGeneratedColumn({ type: "int", name: "classSchedule_item_link_id" })
  classScheduleItemLinkId: number;

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null;

  @Column("int", { name: "classSchedule_id", nullable: true })
  classScheduleId: number | null;

  @Column("int", { name: "classSchedule_type", nullable: true })
  classScheduleType: number | null;

  @Column("int", { name: "classSchedule_item_link_order", nullable: true })
  classScheduleItemLinkOrder: number | null;

  @ManyToOne(
    () => ScheduleItem,
    (scheduleItem) => scheduleItem.classScheduleItemLinks
  )
  @JoinColumn([{ name: "item_id", referencedColumnName: "itemId" }])
  item: ScheduleItem;
}
