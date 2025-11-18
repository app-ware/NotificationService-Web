import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EvaluationReportChildTermItems } from "./EvaluationReportChildTermItems";
import { EvaluationReport } from "./EvaluationReport";

@Index("PK__Evaluati__E595D3C3D138A737", ["evaluationReportLegendId"], {
  unique: true,
})
@Entity("Evaluation_Report_Legend", { schema: "dbo" })
export class EvaluationReportLegend {
  @PrimaryGeneratedColumn({ type: "int", name: "evaluation_report_legend_id" })
  evaluationReportLegendId: number;

  @Column("nvarchar", { name: "evaluation_report_legend_text", nullable: true })
  evaluationReportLegendText: string | null;

  @Column("nvarchar", {
    name: "evaluation_report_legend_value",
    nullable: true,
  })
  evaluationReportLegendValue: string | null;

  @Column("int", { name: "evaluation_report_legend_order", nullable: true })
  evaluationReportLegendOrder: number | null;

  @OneToMany(
    () => EvaluationReportChildTermItems,
    (evaluationReportChildTermItems) =>
      evaluationReportChildTermItems.itemValue2
  )
  evaluationReportChildTermItems: EvaluationReportChildTermItems[];

  @ManyToOne(
    () => EvaluationReport,
    (evaluationReport) => evaluationReport.evaluationReportLegends
  )
  @JoinColumn([
    {
      name: "evaluation_report_id",
      referencedColumnName: "evaluationReportId",
    },
  ])
  evaluationReport: EvaluationReport;
}
