import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Academic__FC1BB4E184908473", ["academicReportRankingTypeId"], {
  unique: true,
})
@Entity("Academic_Report_Ranking_Type", { schema: "dbo" })
export class AcademicReportRankingType {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "academic_report_ranking_type_id",
  })
  academicReportRankingTypeId: number;

  @Column("nvarchar", {
    name: "academic_report_ranking_type_name",
    nullable: true,
  })
  academicReportRankingTypeName: string | null;

  @Column("nvarchar", {
    name: "academic_report_ranking_type_description",
    nullable: true,
  })
  academicReportRankingTypeDescription: string | null;
}
