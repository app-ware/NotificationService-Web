import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Grading___4E0C59223BD75F49", ["gradingReportTermTypeId"], {
  unique: true,
})
@Entity("Grading_Report_Term_Type", { schema: "dbo" })
export class GradingReportTermType {
  @PrimaryGeneratedColumn({ type: "int", name: "grading_report_term_type_id" })
  gradingReportTermTypeId: number;

  @Column("nvarchar", {
    name: "grading_report_term_type_title",
    nullable: true,
  })
  gradingReportTermTypeTitle: string | null;
}
