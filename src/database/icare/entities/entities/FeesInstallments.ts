import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("child_invoice_id", ["childInvoiceId"], {})
@Index("due_date", ["dueDate"], {})
@Index("is_paid", ["isPaid"], {})
@Index("PK__Fees_Ins__461AB790CD79DC11", ["feeInstallmentId"], { unique: true })
@Entity("Fees_Installments", { schema: "dbo" })
export class FeesInstallments {
  @PrimaryGeneratedColumn({ type: "int", name: "fee_installment_id" })
  feeInstallmentId: number;

  @Column("int", { name: "child_invoice_id" })
  childInvoiceId: number;

  @Column("date", { name: "due_date", nullable: true })
  dueDate: Date | null;

  @Column("float", {
    name: "installment_amount",
    nullable: true,
    precision: 53,
  })
  installmentAmount: number | null;

  @Column("bit", { name: "is_paid", nullable: true })
  isPaid: boolean | null;

  @Column("int", { name: "installment_status", nullable: true })
  installmentStatus: number | null;

  @Column("datetime", { name: "modified_date", nullable: true })
  modifiedDate: Date | null;

  @Column("int", { name: "deleted_by", nullable: true })
  deletedBy: number | null;
}
