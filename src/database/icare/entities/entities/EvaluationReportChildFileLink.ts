import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { EvaluationReport } from "./EvaluationReport";
import { ParentReadDataEvaluation } from "./ParentReadDataEvaluation";

@Index("child_id", ["childId"], {})
@Index("PK__Evaluati__4AE816A22F4497E5", ["evaluationReportChildFileLinkId"], {
  unique: true,
})
@Entity("Evaluation_Report_Child_File_Link", { schema: "dbo" })
export class EvaluationReportChildFileLink {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "evaluation_report_child_file_link_id",
  })
  evaluationReportChildFileLinkId: number;

  @Column("int", { name: "child_id" })
  childId: number;

  @Column("nvarchar", { name: "file_link_name", nullable: true })
  fileLinkName: string | null;

  @Column("nvarchar", { name: "evaluation_terms_id", nullable: true })
  evaluationTermsId: string | null;

  @Column("bit", { name: "is_approved", nullable: true, default: () => "(0)" })
  isApproved: boolean | null;

  @ManyToOne(() => Child, (child) => child.evaluationReportChildFileLinks)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => EvaluationReport,
    (evaluationReport) => evaluationReport.evaluationReportChildFileLinks
  )
  @JoinColumn([
    {
      name: "evaluation_report_id",
      referencedColumnName: "evaluationReportId",
    },
  ])
  evaluationReport: EvaluationReport;

  @OneToMany(
    () => ParentReadDataEvaluation,
    (parentReadDataEvaluation) => parentReadDataEvaluation.evaluationReport
  )
  parentReadDataEvaluations: ParentReadDataEvaluation[];
}
