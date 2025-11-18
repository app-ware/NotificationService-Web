import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Report_A__9E2397E0E165B832", ["logId"], { unique: true })
@Entity("Report_Approve_Log", { schema: "dbo" })
export class ReportApproveLog {
  @PrimaryGeneratedColumn({ type: "int", name: "log_id" })
  logId: number;

  @Column("nvarchar", { name: "log_text", nullable: true })
  logText: string | null;

  @Column("int", { name: "report_id", nullable: true })
  reportId: number | null;

  @Column("int", { name: "log_user_id", nullable: true })
  logUserId: number | null;

  @Column("nvarchar", { name: "log_user_type", nullable: true, length: 55 })
  logUserType: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("datetime", {
    name: "log_datetime",
    nullable: true,
    default: () => "getdate()",
  })
  logDatetime: Date | null;
}
