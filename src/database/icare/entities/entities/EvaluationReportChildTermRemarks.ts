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

@Index(
  "child_id_INCLUDE_evaluation_report_id-evaluation_report_term_id",
  ["childId", "evaluationReportId", "evaluationReportTermId"],
  {}
)
@Index("PK__Evaluati__7DDE745032CBA61D", ["evaluationReportRemarkId"], {
  unique: true,
})
@Entity("Evaluation_Report_Child_Term_Remarks", { schema: "dbo" })
export class EvaluationReportChildTermRemarks {
  @PrimaryGeneratedColumn({ type: "int", name: "evaluation_report_remark_id" })
  evaluationReportRemarkId: number;

  @Column("int", { name: "child_id" })
  childId: number;

  @Column("int", { name: "evaluation_report_id" })
  evaluationReportId: number;

  @Column("int", { name: "evaluation_report_term_id" })
  evaluationReportTermId: number;

  @Column("int", { name: "node_level_id", nullable: true })
  nodeLevelId: number | null;

  @Column("nvarchar", { name: "node_remark", nullable: true })
  nodeRemark: string | null;

  @ManyToOne(() => Child, (child) => child.evaluationReportChildTermRemarks)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => EvaluationReport,
    (evaluationReport) => evaluationReport.evaluationReportChildTermRemarks
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
      evaluationReportTerms.evaluationReportChildTermRemarks
  )
  @JoinColumn([
    {
      name: "evaluation_report_term_id",
      referencedColumnName: "evaluationReportTermId",
    },
  ])
  evaluationReportTerm: EvaluationReportTerms;
}
