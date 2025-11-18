import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_PrintableReport_Sizes", ["printableReportId"], {
  unique: true,
})
@Entity("Center_PrintableReport_Sizes", { schema: "dbo" })
export class CenterPrintableReportSizes {
  @PrimaryGeneratedColumn({ type: "int", name: "printable_report_id" })
  printableReportId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "report_type", nullable: true })
  reportType: number | null;

  @Column("int", { name: "report_size_id", nullable: true })
  reportSizeId: number | null;
}
