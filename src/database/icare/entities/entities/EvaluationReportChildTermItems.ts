import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { EvaluationReport } from "./EvaluationReport";
import { EvaluationReportTerms } from "./EvaluationReportTerms";
import { EvaluationReportNodeLevels } from "./EvaluationReportNodeLevels";
import { EvaluationReportLegend } from "./EvaluationReportLegend";

@Index(
  "child_id-evaluation_report_id-evaluation_report_term_id_INCLUDE_item_id-item_value",
  [
    "itemId",
    "itemValue",
    "childId",
    "evaluationReportId",
    "evaluationReportTermId",
  ],
  {}
)
@Index("PK__Evaluati__8457FC3AF2344C2B", ["evaluationReportChildTermItemId"], {
  unique: true,
})
@Entity("Evaluation_Report_Child_Term_Items", { schema: "dbo" })
export class EvaluationReportChildTermItems {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "evaluation_report_child_term_item_id",
  })
  evaluationReportChildTermItemId: number;

  @Column("int", { name: "child_id" })
  childId: number;

  @Column("int", { name: "evaluation_report_id" })
  evaluationReportId: number;

  @Column("int", { name: "evaluation_report_term_id" })
  evaluationReportTermId: number;

  @Column("int", { name: "item_id" })
  itemId: number;

  @Column("int", { name: "item_value", nullable: true })
  itemValue: number | null;

  @ManyToOne(() => Child, (child) => child.evaluationReportChildTermItems)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => EvaluationReport,
    (evaluationReport) => evaluationReport.evaluationReportChildTermItems
  )
  @JoinColumn([
    {
      name: "evaluation_report_id",
      referencedColumnName: "evaluationReportId",
    },
  ])
  evaluationReport: EvaluationReport;

  @ManyToOne(
    () => EvaluationReportTerms,
    (evaluationReportTerms) =>
      evaluationReportTerms.evaluationReportChildTermItems
  )
  @JoinColumn([
    {
      name: "evaluation_report_term_id",
      referencedColumnName: "evaluationReportTermId",
    },
  ])
  evaluationReportTerm: EvaluationReportTerms;

  @ManyToOne(
    () => EvaluationReportNodeLevels,
    (evaluationReportNodeLevels) =>
      evaluationReportNodeLevels.evaluationReportChildTermItems
  )
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: EvaluationReportNodeLevels;

  @ManyToOne(
    () => EvaluationReportLegend,
    (evaluationReportLegend) =>
      evaluationReportLegend.evaluationReportChildTermItems
  )
  @JoinColumn([
    { name: "item_value", referencedColumnName: "evaluationReportLegendId" },
  ])
  itemValue2: EvaluationReportLegend;
}
