import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Center_A__47C2C7DFD4917330", ["reportVariantId"], { unique: true })
@Entity("Center_AccountingReport_Variants", { schema: "dbo" })
export class CenterAccountingReportVariants {
  @PrimaryGeneratedColumn({ type: "int", name: "report_variant_id" })
  reportVariantId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "fineprint_title", nullable: true })
  fineprintTitle: string | null;

  @Column("bit", { name: "fineprint_visible", nullable: true })
  fineprintVisible: boolean | null;

  @Column("nvarchar", { name: "footer_title", nullable: true })
  footerTitle: string | null;

  @Column("bit", { name: "footer_visible", nullable: true })
  footerVisible: boolean | null;

  @Column("nvarchar", { name: "signature1_title", nullable: true })
  signature1Title: string | null;

  @Column("bit", { name: "signature1_visible", nullable: true })
  signature1Visible: boolean | null;

  @Column("nvarchar", { name: "signature2_title", nullable: true })
  signature2Title: string | null;

  @Column("bit", { name: "signature2_visible", nullable: true })
  signature2Visible: boolean | null;

  @Column("nvarchar", { name: "signature3_title", nullable: true })
  signature3Title: string | null;

  @Column("bit", { name: "signature3_visible", nullable: true })
  signature3Visible: boolean | null;

  @Column("nvarchar", { name: "signature4_title", nullable: true })
  signature4Title: string | null;

  @Column("bit", { name: "signature4_visible", nullable: true })
  signature4Visible: boolean | null;
}
