import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("child_invoice_id", ["childInvoiceId"], {})
@Index("PK__Child_Fe__2765B5C5A0E0C3DD", ["childFeeId"], { unique: true })
@Entity("Child_Fee", { schema: "dbo" })
export class ChildFee {
  @PrimaryGeneratedColumn({ type: "int", name: "child_fee_id" })
  childFeeId: number;

  @Column("int", { name: "child_invoice_id" })
  childInvoiceId: number;

  @Column("nvarchar", { name: "fee_title", nullable: true })
  feeTitle: string | null;

  @Column("float", { name: "fee_amount", nullable: true, precision: 53 })
  feeAmount: number | null;

  @Column("bit", { name: "is_additional", nullable: true })
  isAdditional: boolean | null;
}
