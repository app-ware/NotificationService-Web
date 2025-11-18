import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Provider__3214EC27C4971988", ["id"], { unique: true })
@Index("provider_id", ["providerId"], { unique: true })
@Entity("Provider_Settings", { schema: "dbo" })
export class ProviderSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "provider_id", nullable: true })
  providerId: number | null;

  @Column("int", { name: "report_approve", nullable: true })
  reportApprove: number | null;

  @Column("int", { name: "photo_approve", nullable: true })
  photoApprove: number | null;

  @Column("int", { name: "evaluation_report_approve", nullable: true })
  evaluationReportApprove: number | null;

  @Column("int", { name: "homework_approve", nullable: true })
  homeworkApprove: number | null;

  @Column("int", {
    name: "parent_messaging",
    nullable: true,
    default: () => "(0)",
  })
  parentMessaging: number | null;
}
