import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EvaluationReport } from "./EvaluationReport";

@Index("PK__Evaluati__B175082F9E3B80B6", ["evaluationReportLevel_1Id"], {
  unique: true,
})
@Index("UQ__Evaluati__B7BAC3B9B98830C0", ["evaluationReportLevel_1Key"], {
  unique: true,
})
@Entity("Evaluation_Report_Node_Level_1", { schema: "dbo" })
export class EvaluationReportNodeLevel_1 {
  @PrimaryGeneratedColumn({ type: "int", name: "evaluation_report_level_1_id" })
  evaluationReportLevel_1Id: number;

  @Column("nvarchar", {
    name: "evaluation_report_level_1_key",
    unique: true,
    length: 500,
  })
  evaluationReportLevel_1Key: string;

  @Column("nvarchar", {
    name: "evaluation_report_level_1_title",
    nullable: true,
  })
  evaluationReportLevel_1Title: string | null;

  @ManyToOne(
    () => EvaluationReport,
    (evaluationReport) => evaluationReport.evaluationReportNodeLevelS
  )
  @JoinColumn([
    {
      name: "evaluation_report_id",
      referencedColumnName: "evaluationReportId",
    },
  ])
  evaluationReport: EvaluationReport;
}
