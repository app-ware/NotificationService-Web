import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReportNumberlistItems } from "./ReportNumberlistItems";

@Index("itemID", ["itemId"], { unique: true })
@Index("list_id", ["listId"], {})
@Index("PK__NumberLi__56A1284AE0B71580", ["itemId"], { unique: true })
@Entity("NumberList", { schema: "dbo" })
export class NumberList {
  @PrimaryGeneratedColumn('increment',{
    type: "numeric",
    name: "itemID",
  })
  itemId: number;

  @Column("numeric", {
    name: "itemorder",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  itemorder: number | null;

  @Column("numeric", {
    name: "list_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  listId: number | null;

  @Column("char", { name: "visibility", nullable: true, length: 1 })
  visibility: string | null;

  @Column("nvarchar", { name: "itemtext", nullable: true })
  itemtext: string | null;

  @Column("nvarchar", { name: "itemtext1", nullable: true })
  itemtext1: string | null;

  @Column("nvarchar", { name: "itemtext2", nullable: true })
  itemtext2: string | null;

  @Column("int", { name: "group_id", nullable: true })
  groupId: number | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @OneToMany(
    () => ReportNumberlistItems,
    (reportNumberlistItems) => reportNumberlistItems.item
  )
  reportNumberlistItems: ReportNumberlistItems[];
}
