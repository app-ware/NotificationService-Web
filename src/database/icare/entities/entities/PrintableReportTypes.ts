import { Column, Entity, Index } from "typeorm";

@Index("PK_PrintableReport_Types", ["printableReportTypeId"], { unique: true })
@Entity("PrintableReport_Types", { schema: "dbo" })
export class PrintableReportTypes {
  @Column("int", { primary: true, name: "printable_report_type_id" })
  printableReportTypeId: number;

  @Column("nvarchar", { name: "printable_report_type_title", nullable: true })
  printableReportTypeTitle: string | null;
}
