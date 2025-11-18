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

@Index(
  "evaluation_report_id-INCLUDE-id-level-parent_id-title-visibility",
  ["id", "level", "parentId", "title", "visibility", "evaluationReportId"],
  {}
)
@Index("PK__Evaluati__3213E83F5E1896D5", ["id"], { unique: true })
@Index("UQ__Evaluati__136EF542041B61FB", ["itemKey"], { unique: true })
@Entity("Evaluation_Report_Node_Levels", { schema: "dbo" })
export class EvaluationReportNodeLevels {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "evaluation_report_id" })
  evaluationReportId: number;

  @Column("int", { name: "level" })
  level: number;

  @Column("nvarchar", { name: "ItemKey", unique: true, length: 500 })
  itemKey: string;

  @Column("int", { name: "parent_id", nullable: true })
  parentId: number | null;

  @Column("nvarchar", { name: "title", nullable: true })
  title: string | null;

  @Column("bit", { name: "visibility", nullable: true })
  visibility: boolean | null;

  @OneToMany(
    () => EvaluationReportChildTermItems,
    (evaluationReportChildTermItems) => evaluationReportChildTermItems.item
  )
  evaluationReportChildTermItems: EvaluationReportChildTermItems[];

  @ManyToOne(
    () => EvaluationReport,
    (evaluationReport) => evaluationReport.evaluationReportNodeLevels
  )
  @JoinColumn([
    {
      name: "evaluation_report_id",
      referencedColumnName: "evaluationReportId",
    },
  ])
  evaluationReport: EvaluationReport;
}
