import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EvaluationReportChildFileLink } from "./EvaluationReportChildFileLink";
import { Child } from "./Child";

@Index("child_id-evaluation_report_id", ["evaluationReportId", "childId"], {
  unique: true,
})
@Index("PK_Parent_Read_Data_Evaluation", ["id"], { unique: true })
@Entity("Parent_Read_Data_Evaluation", { schema: "dbo" })
export class ParentReadDataEvaluation {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "evaluation_report_id", nullable: true })
  evaluationReportId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(
    () => EvaluationReportChildFileLink,
    (evaluationReportChildFileLink) =>
      evaluationReportChildFileLink.parentReadDataEvaluations
  )
  @JoinColumn([
    {
      name: "evaluation_report_id",
      referencedColumnName: "evaluationReportChildFileLinkId",
    },
  ])
  evaluationReport: EvaluationReportChildFileLink;

  @ManyToOne(() => Child, (child) => child.parentReadDataEvaluations, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
