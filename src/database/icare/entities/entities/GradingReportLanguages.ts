import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Grading___EFF574308ED5AD7B", ["gradingReportLangId"], {
  unique: true,
})
@Entity("Grading_Report_Languages", { schema: "dbo" })
export class GradingReportLanguages {
  @PrimaryGeneratedColumn({ type: "int", name: "grading_report_lang_id" })
  gradingReportLangId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "grading_report_lang1", nullable: true })
  gradingReportLang1: string | null;

  @Column("nvarchar", { name: "grading_report_lang2", nullable: true })
  gradingReportLang2: string | null;
}
