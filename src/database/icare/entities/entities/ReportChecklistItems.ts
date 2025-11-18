import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChildReport } from "./ChildReport";
import { CheckList } from "./CheckList";

@Index("item_id", ["itemId"], {})
@Index("item_id-report_id", ["reportId", "itemId"], { unique: true })
@Index("PK_Report_Checklist_Items", ["reportChecklistItemId"], { unique: true })
@Index("report_id", ["reportId"], {})
@Entity("Report_Checklist_Items", { schema: "dbo" })
export class ReportChecklistItems {
  @PrimaryGeneratedColumn({ type: "int", name: "report_checklist_item_id" })
  reportChecklistItemId: number;

  @Column("int", { name: "report_id", nullable: true })
  reportId: number | null;

  @Column("numeric", {
    name: "item_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  itemId: number | null;

  @ManyToOne(
    () => ChildReport,
    (childReport) => childReport.reportChecklistItems,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "report_id", referencedColumnName: "id" }])
  report: ChildReport;

  @ManyToOne(() => CheckList, (checkList) => checkList.reportChecklistItems)
  @JoinColumn([{ name: "item_id", referencedColumnName: "itemId" }])
  item: CheckList;
}
