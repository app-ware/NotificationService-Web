import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChildInvoice } from "./ChildInvoice";

@Index("PK_Invoice_Api_Link", ["id"], { unique: true })
@Entity("Invoice_Api_Link", { schema: "dbo" })
export class InvoiceApiLink {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "academic_year_id", nullable: true })
  academicYearId: number | null;

  @Column("nvarchar", { name: "imported_invoice_id", nullable: true })
  importedInvoiceId: string | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @ManyToOne(
    () => ChildInvoice,
    (childInvoice) => childInvoice.invoiceApiLinks,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "icare_invoice_id", referencedColumnName: "childInvoiceId" },
  ])
  icareInvoice: ChildInvoice;
}
