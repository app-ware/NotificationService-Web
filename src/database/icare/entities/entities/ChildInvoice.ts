import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvoiceApiLink } from "./InvoiceApiLink";

@Index("PK__Child_In__49DFDF3AB62E9AA9", ["childInvoiceId"], { unique: true })
@Index("term_id - Academic_year", ["termId", "academicYear"], {})
@Entity("Child_Invoice", { schema: "dbo" })
export class ChildInvoice {
  @PrimaryGeneratedColumn({ type: "int", name: "child_invoice_id" })
  childInvoiceId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "term_id", nullable: true })
  termId: number | null;

  @Column("int", { name: "academic_year", nullable: true })
  academicYear: number | null;

  @Column("int", { name: "enrollment_type", nullable: true })
  enrollmentType: number | null;

  @Column("int", { name: "days_count", nullable: true })
  daysCount: number | null;

  @Column("int", { name: "center_invoice_number", nullable: true })
  centerInvoiceNumber: number | null;

  @Column("bit", { name: "is_active", nullable: true })
  isActive: boolean | null;

  @Column("nvarchar", { name: "invoice_title", nullable: true })
  invoiceTitle: string | null;

  @Column("date", {
    name: "invoice_date",
    nullable: true,
    default: () => "getdate()",
  })
  invoiceDate: Date | null;

  @Column("float", {
    name: "vat_amount",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  vatAmount: number | null;

  @OneToMany(
    () => InvoiceApiLink,
    (invoiceApiLink) => invoiceApiLink.icareInvoice
  )
  invoiceApiLinks: InvoiceApiLink[];
}
