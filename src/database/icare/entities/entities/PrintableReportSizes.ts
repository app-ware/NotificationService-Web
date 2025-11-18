import { Column, Entity, Index } from "typeorm";

@Index("PK_PrintableReport_Sizes", ["reportSizeId"], { unique: true })
@Entity("PrintableReport_Sizes", { schema: "dbo" })
export class PrintableReportSizes {
  @Column("int", { primary: true, name: "report_size_id" })
  reportSizeId: number;

  @Column("nvarchar", {
    name: "report_size_title",
    nullable: true,
    length: 100,
  })
  reportSizeTitle: string | null;
}
