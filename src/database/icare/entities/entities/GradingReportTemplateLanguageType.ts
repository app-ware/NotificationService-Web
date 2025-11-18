import { Column, Entity, Index, OneToMany } from "typeorm";
import { CenterGradingReportTemplateLanguages } from "./CenterGradingReportTemplateLanguages";

@Index(
  "PK__Grading___A85F5940D8931559",
  ["gradingReportTemplateLanguageTypeId"],
  { unique: true }
)
@Entity("Grading_Report_Template_Language_Type", { schema: "dbo" })
export class GradingReportTemplateLanguageType {
  @Column("int", {
    primary: true,
    name: "grading_report_template_language_type_id",
  })
  gradingReportTemplateLanguageTypeId: number;

  @Column("nvarchar", { name: "grading_report_template_language_type_title" })
  gradingReportTemplateLanguageTypeTitle: string;

  @OneToMany(
    () => CenterGradingReportTemplateLanguages,
    (centerGradingReportTemplateLanguages) =>
      centerGradingReportTemplateLanguages.gradingReportTemplateLanguageType
  )
  centerGradingReportTemplateLanguages: CenterGradingReportTemplateLanguages[];
}
