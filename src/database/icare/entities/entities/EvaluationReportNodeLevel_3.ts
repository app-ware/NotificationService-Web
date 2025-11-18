import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Evaluati__F43D0778E39B691D", ["evaluationReportLevel_3Id"], {
  unique: true,
})
@Index("UQ__Evaluati__5A49221D120A34F2", ["evaluationReportLevel_3Key"], {
  unique: true,
})
@Entity("Evaluation_Report_Node_Level_3", { schema: "dbo" })
export class EvaluationReportNodeLevel_3 {
  @PrimaryGeneratedColumn({ type: "int", name: "evaluation_report_level_3_id" })
  evaluationReportLevel_3Id: number;

  @Column("nvarchar", {
    name: "evaluation_report_level_3_key",
    unique: true,
    length: 500,
  })
  evaluationReportLevel_3Key: string;

  @Column("nvarchar", {
    name: "evaluation_report_level_3_title",
    nullable: true,
  })
  evaluationReportLevel_3Title: string | null;
}
