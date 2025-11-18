import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NumberList } from "./NumberList";
import { ChildReport } from "./ChildReport";

@Index("item_id-report_id", ["reportId", "itemId"], { unique: true })
@Index("PK_Report_Numberlist_Items", ["reportNrlistItemId"], { unique: true })
@Index("report_id", ["reportId"], {})
@Entity("Report_Numberlist_Items", { schema: "dbo" })
export class ReportNumberlistItems {
  @PrimaryGeneratedColumn({ type: "int", name: "report_nrlist_item_id" })
  reportNrlistItemId: number;

  @Column("int", { name: "report_id", nullable: true })
  reportId: number | null;

  @Column("numeric", {
    name: "item_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  itemId: number | null;

  @Column("int", { name: "item_value", nullable: true })
  itemValue: number | null;

  @ManyToOne(() => NumberList, (numberList) => numberList.reportNumberlistItems)
  @JoinColumn([{ name: "item_id", referencedColumnName: "itemId" }])
  item: NumberList;

  @ManyToOne(
    () => ChildReport,
    (childReport) => childReport.reportNumberlistItems,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "report_id", referencedColumnName: "id" }])
  report: ChildReport;
}
