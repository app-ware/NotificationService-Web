import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GradingReportTemplateLanguageType } from "./GradingReportTemplateLanguageType";

@Index("PK__Center_G__9057CDB6A3842DC2", ["gradingReportTemplateLanguageId"], {
  unique: true,
})
@Entity("Center_Grading_Report_Template_Languages", { schema: "dbo" })
export class CenterGradingReportTemplateLanguages {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "grading_report_template_language_id",
  })
  gradingReportTemplateLanguageId: number;

  @Column("nvarchar", { name: "grading_report_template_language_title" })
  gradingReportTemplateLanguageTitle: string;

  @Column("nvarchar", { name: "grading_report_template_language_json" })
  gradingReportTemplateLanguageJson: string;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @ManyToOne(
    () => GradingReportTemplateLanguageType,
    (gradingReportTemplateLanguageType) =>
      gradingReportTemplateLanguageType.centerGradingReportTemplateLanguages
  )
  @JoinColumn([
    {
      name: "grading_report_template_language_type",
      referencedColumnName: "gradingReportTemplateLanguageTypeId",
    },
  ])
  gradingReportTemplateLanguageType: GradingReportTemplateLanguageType;
}
