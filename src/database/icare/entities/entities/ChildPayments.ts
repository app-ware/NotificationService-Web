import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "installment_id-INCLUDE-payment_amount",
  ["paymentAmount", "installmentId"],
  {}
)
@Index("installment_id-UNIQUE", ["installmentId"], { unique: true })
@Index("PK_Child_Payments", ["paymentId"], { unique: true })
@Entity("Child_Payments", { schema: "dbo" })
export class ChildPayments {
  @PrimaryGeneratedColumn({ type: "int", name: "payment_id" })
  paymentId: number;

  @Column("int", { name: "installment_id", nullable: true })
  installmentId: number | null;

  @Column("float", { name: "payment_amount", nullable: true, precision: 53 })
  paymentAmount: number | null;

  @Column("date", { name: "payment_date", nullable: true })
  paymentDate: Date | null;

  @Column("nvarchar", { name: "payment_note", nullable: true })
  paymentNote: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_receipt_number", nullable: true })
  centerReceiptNumber: number | null;

  @Column("int", { name: "payment_type", nullable: true })
  paymentType: number | null;

  @Column("nvarchar", { name: "payment_type_remark", nullable: true })
  paymentTypeRemark: string | null;

  @Column("date", { name: "payment_value_date", nullable: true })
  paymentValueDate: Date | null;
}
