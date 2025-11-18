import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Evaluati__3EFFA113E5206C32", ["evaluationReportLevel_4Id"], {
  unique: true,
})
@Index("UQ__Evaluati__D3BF2FBC40A0E28F", ["evaluationReportLevel_4Key"], {
  unique: true,
})
@Entity("Evaluation_Report_Node_Level_4", { schema: "dbo" })
export class EvaluationReportNodeLevel_4 {
  @PrimaryGeneratedColumn({ type: "int", name: "evaluation_report_level_4_id" })
  evaluationReportLevel_4Id: number;

  @Column("nvarchar", {
    name: "evaluation_report_level_4_key",
    unique: true,
    length: 500,
  })
  evaluationReportLevel_4Key: string;

  @Column("nvarchar", {
    name: "evaluation_report_level_4_title",
    nullable: true,
  })
  evaluationReportLevel_4Title: string | null;
}
