import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("child_invoice_id", ["childInvoiceId"], {})
@Index("PK__Invoice___BDBE9EF9709EB2F4", ["discountId"], { unique: true })
@Entity("Invoice_Discount", { schema: "dbo" })
export class InvoiceDiscount {
  @PrimaryGeneratedColumn({ type: "int", name: "discount_id" })
  discountId: number;

  @Column("int", { name: "child_invoice_id", nullable: true })
  childInvoiceId: number | null;

  @Column("float", { name: "discount_amount", nullable: true, precision: 53 })
  discountAmount: number | null;

  @Column("nvarchar", { name: "discount_description", nullable: true })
  discountDescription: string | null;
}
