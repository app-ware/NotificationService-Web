import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";
import { EvaluationReportChildFileLink } from "./EvaluationReportChildFileLink";
import { EvaluationReportChildTermItems } from "./EvaluationReportChildTermItems";
import { EvaluationReportChildTermRemarks } from "./EvaluationReportChildTermRemarks";
import { EvaluationReportClasses } from "./EvaluationReportClasses";
import { EvaluationReportLegend } from "./EvaluationReportLegend";
import { EvaluationReportNodeLevel_1 } from "./EvaluationReportNodeLevel_1";
import { EvaluationReportNodeLevels } from "./EvaluationReportNodeLevels";
import { EvaluationReportPrintingFormVariants } from "./EvaluationReportPrintingFormVariants";
import { EvaluationReportTerms } from "./EvaluationReportTerms";

@Index("PK__Evaluati__6022596C3C905F3E", ["evaluationReportId"], {
  unique: true,
})
@Entity("Evaluation_Report", { schema: "dbo" })
export class EvaluationReport {
  @PrimaryGeneratedColumn({ type: "int", name: "evaluation_report_id" })
  evaluationReportId: number;

  @Column("nvarchar", { name: "evaluation_report_title", nullable: true })
  evaluationReportTitle: string | null;

  @Column("nvarchar", { name: "evaluation_report_description", nullable: true })
  evaluationReportDescription: string | null;

  @Column("int", { name: "academic_year", nullable: true })
  academicYear: number | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @Column("int", { name: "evaluation_report_remark_type_id", nullable: true })
  evaluationReportRemarkTypeId: number | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.evaluationReports)
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;

  @OneToMany(
    () => EvaluationReportChildFileLink,
    (evaluationReportChildFileLink) =>
      evaluationReportChildFileLink.evaluationReport
  )
  evaluationReportChildFileLinks: EvaluationReportChildFileLink[];

  @OneToMany(
    () => EvaluationReportChildTermItems,
    (evaluationReportChildTermItems) =>
      evaluationReportChildTermItems.evaluationReport
  )
  evaluationReportChildTermItems: EvaluationReportChildTermItems[];

  @OneToMany(
    () => EvaluationReportChildTermRemarks,
    (evaluationReportChildTermRemarks) =>
      evaluationReportChildTermRemarks.evaluationReport
  )
  evaluationReportChildTermRemarks: EvaluationReportChildTermRemarks[];

  @OneToMany(
    () => EvaluationReportClasses,
    (evaluationReportClasses) => evaluationReportClasses.evaluationReport
  )
  evaluationReportClasses: EvaluationReportClasses[];

  @OneToMany(
    () => EvaluationReportLegend,
    (evaluationReportLegend) => evaluationReportLegend.evaluationReport
  )
  evaluationReportLegends: EvaluationReportLegend[];

  @OneToMany(
    () => EvaluationReportNodeLevel_1,
    (evaluationReportNodeLevel_1) =>
      evaluationReportNodeLevel_1.evaluationReport
  )
  evaluationReportNodeLevelS: EvaluationReportNodeLevel_1[];

  @OneToMany(
    () => EvaluationReportNodeLevels,
    (evaluationReportNodeLevels) => evaluationReportNodeLevels.evaluationReport
  )
  evaluationReportNodeLevels: EvaluationReportNodeLevels[];

  @OneToMany(
    () => EvaluationReportPrintingFormVariants,
    (evaluationReportPrintingFormVariants) =>
      evaluationReportPrintingFormVariants.evaluationReport
  )
  evaluationReportPrintingFormVariants: EvaluationReportPrintingFormVariants[];

  @OneToMany(
    () => EvaluationReportTerms,
    (evaluationReportTerms) => evaluationReportTerms.evaluationReport
  )
  evaluationReportTerms: EvaluationReportTerms[];
}
