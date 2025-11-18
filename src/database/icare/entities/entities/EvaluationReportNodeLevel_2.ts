import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Evaluati__23F2394440F9E429", ["evaluationReportLevel_2Id"], {
  unique: true,
})
@Index("UQ__Evaluati__3B64EC5D830FCF4E", ["evaluationReportLevel_2Key"], {
  unique: true,
})
@Entity("Evaluation_Report_Node_Level_2", { schema: "dbo" })
export class EvaluationReportNodeLevel_2 {
  @PrimaryGeneratedColumn({ type: "int", name: "evaluation_report_level_2_id" })
  evaluationReportLevel_2Id: number;

  @Column("nvarchar", {
    name: "evaluation_report_level_2_key",
    unique: true,
    length: 500,
  })
  evaluationReportLevel_2Key: string;

  @Column("nvarchar", {
    name: "evaluation_report_level_2_title",
    nullable: true,
  })
  evaluationReportLevel_2Title: string | null;
}
