import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Child_Extra_Payment", ["childExtraPaymentId"], { unique: true })
@Entity("Child_Extra_Payment", { schema: "dbo" })
export class ChildExtraPayment {
  @PrimaryGeneratedColumn({ type: "int", name: "child_extra_payment_id" })
  childExtraPaymentId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "extra_payment_id", nullable: true })
  extraPaymentId: number | null;

  @Column("bit", { name: "is_paid", nullable: true })
  isPaid: boolean | null;

  @Column("int", { name: "payment_type", nullable: true })
  paymentType: number | null;

  @Column("nvarchar", { name: "payment_type_remark", nullable: true })
  paymentTypeRemark: string | null;

  @Column("date", { name: "payment_date", nullable: true })
  paymentDate: Date | null;

  @Column("nvarchar", { name: "payment_note", nullable: true })
  paymentNote: string | null;

  @Column("date", { name: "payment_value_date", nullable: true })
  paymentValueDate: Date | null;

  @Column("int", { name: "center_receipt_number", nullable: true })
  centerReceiptNumber: number | null;

  @Column("int", { name: "installment_status", nullable: true })
  installmentStatus: number | null;

  @Column("datetime", { name: "modified_date", nullable: true })
  modifiedDate: Date | null;

  @Column("float", { name: "paid_amount", nullable: true, precision: 53 })
  paidAmount: number | null;

  @Column("int", { name: "deleted_by", nullable: true })
  deletedBy: number | null;
}
