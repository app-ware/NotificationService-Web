import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EvaluationReport } from "./EvaluationReport";

@Index("PK_Evaluation_Report_Printing_Template", ["reportPrintingTemplateId"], {
  unique: true,
})
@Entity("Evaluation_Report_Printing_Form_Variants", { schema: "dbo" })
export class EvaluationReportPrintingFormVariants {
  @PrimaryGeneratedColumn({ type: "int", name: "report_printing_template_id" })
  reportPrintingTemplateId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "evaluation_report_variants", nullable: true })
  evaluationReportVariants: string | null;

  @ManyToOne(
    () => EvaluationReport,
    (evaluationReport) => evaluationReport.evaluationReportPrintingFormVariants,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "evaluation_report_id",
      referencedColumnName: "evaluationReportId",
    },
  ])
  evaluationReport: EvaluationReport;
}
