import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Installm__349CE678C3F39EB8", ["installmentStatusLogId"], {
  unique: true,
})
@Entity("Installment_Status_Log", { schema: "dbo" })
export class InstallmentStatusLog {
  @PrimaryGeneratedColumn({ type: "int", name: "installment_status_log_id" })
  installmentStatusLogId: number;

  @Column("int", { name: "installment_id" })
  installmentId: number;

  @Column("int", { name: "installment_type" })
  installmentType: number;

  @Column("int", { name: "userid" })
  userid: number;

  @Column("int", { name: "log_type" })
  logType: number;

  @Column("nvarchar", { name: "log_text", nullable: true, length: 500 })
  logText: string | null;

  @Column("datetime", {
    name: "log_date",
    nullable: true,
    default: () => "getdate()",
  })
  logDate: Date | null;
}
