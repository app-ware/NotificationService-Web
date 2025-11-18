import { Column, Entity, Index } from "typeorm";

@Index("PK_Report_CounterType", ["reportCounterTypeId"], { unique: true })
@Entity("Report_CounterType", { schema: "dbo" })
export class ReportCounterType {
  @Column("int", { primary: true, name: "report_counter_type_id" })
  reportCounterTypeId: number;

  @Column("nvarchar", { name: "report_counter_type_title", nullable: true })
  reportCounterTypeTitle: string | null;
}
