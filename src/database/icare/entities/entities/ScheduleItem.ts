import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassScheduleItemLink } from "./ClassScheduleItemLink";

@Index("center_id", ["centerId"], {})
@Index("PK_Schedule", ["itemId"], { unique: true })
@Entity("Schedule_Item", { schema: "dbo" })
export class ScheduleItem {
  @PrimaryGeneratedColumn({ type: "int", name: "item_id" })
  itemId: number;

  @Column("nvarchar", { name: "item_start_time", nullable: true, length: 50 })
  itemStartTime: string | null;

  @Column("nvarchar", { name: "item_end_time", nullable: true, length: 50 })
  itemEndTime: string | null;

  @Column("nvarchar", { name: "item_title", nullable: true })
  itemTitle: string | null;

  @Column("nvarchar", { name: "item_description", nullable: true })
  itemDescription: string | null;

  @Column("nvarchar", { name: "item_title1", nullable: true })
  itemTitle1: string | null;

  @Column("nvarchar", { name: "item_description1", nullable: true })
  itemDescription1: string | null;

  @Column("nvarchar", { name: "item_title2", nullable: true })
  itemTitle2: string | null;

  @Column("nvarchar", { name: "item_description2", nullable: true })
  itemDescription2: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @OneToMany(
    () => ClassScheduleItemLink,
    (classScheduleItemLink) => classScheduleItemLink.item
  )
  classScheduleItemLinks: ClassScheduleItemLink[];
}
