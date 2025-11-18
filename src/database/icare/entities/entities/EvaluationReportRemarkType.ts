import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Evaluation_Report_Remark_Type", { schema: "dbo" })
export class EvaluationReportRemarkType {
  
  @PrimaryGeneratedColumn()
  id: number;
  @Column("int", { name: "evaluation_report_remark_type_id" })
  evaluationReportRemarkTypeId: number;

  @Column("nvarchar", {
    name: "evaluation_report_remark_type_title",
    nullable: true,
    length: 200,
  })
  evaluationReportRemarkTypeTitle: string | null;
}
