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
import { EvaluationReportChildTermRemarks } from "./EvaluationReportChildTermRemarks";
import { EvaluationReport } from "./EvaluationReport";

@Index("PK__Evaluati__BBE5922B24C2A8BA", ["evaluationReportTermId"], {
  unique: true,
})
@Entity("Evaluation_Report_Terms", { schema: "dbo" })
export class EvaluationReportTerms {
  @PrimaryGeneratedColumn({ type: "int", name: "evaluation_report_term_id" })
  evaluationReportTermId: number;

  @Column("nvarchar", { name: "evaluation_report_term_title", nullable: true })
  evaluationReportTermTitle: string | null;

  @Column("date", { name: "evaluation_report_term_date_from", nullable: true })
  evaluationReportTermDateFrom: Date | null;

  @Column("date", { name: "evaluation_report_term_date_to", nullable: true })
  evaluationReportTermDateTo: Date | null;

  @OneToMany(
    () => EvaluationReportChildTermItems,
    (evaluationReportChildTermItems) =>
      evaluationReportChildTermItems.evaluationReportTerm
  )
  evaluationReportChildTermItems: EvaluationReportChildTermItems[];

  @OneToMany(
    () => EvaluationReportChildTermRemarks,
    (evaluationReportChildTermRemarks) =>
      evaluationReportChildTermRemarks.evaluationReportTerm
  )
  evaluationReportChildTermRemarks: EvaluationReportChildTermRemarks[];

  @ManyToOne(
    () => EvaluationReport,
    (evaluationReport) => evaluationReport.evaluationReportTerms
  )
  @JoinColumn([
    {
      name: "evaluation_report_id",
      referencedColumnName: "evaluationReportId",
    },
  ])
  evaluationReport: EvaluationReport;
}
