import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReportChecklistItems } from "./ReportChecklistItems";

@Index("itemID", ["itemId"], { unique: true })
@Index("list_id", ["listId"], {})
@Index("PK__CheckLis__56A1284AE76473AE", ["itemId"], { unique: true })
@Entity("CheckList", { schema: "dbo" })
export class CheckList {

  @PrimaryGeneratedColumn({ type: "int", name: "itemID" })
  itemId: number;


  @Column("int", { name: "itemorder", nullable: true })
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

  @Column("nvarchar", { name: "isDefault", nullable: true })
  isDefault: string | null;

  @Column("int", { name: "group_id", nullable: true })
  groupId: number | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @OneToMany(
    () => ReportChecklistItems,
    (reportChecklistItems) => reportChecklistItems.item
  )
  reportChecklistItems: ReportChecklistItems[];
}
