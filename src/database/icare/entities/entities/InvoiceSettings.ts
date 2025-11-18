import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK_Invoice_Settings", ["id"], { unique: true })
@Entity("Invoice_Settings", { schema: "dbo" })
export class InvoiceSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("float", { name: "vat_percentage", nullable: true, precision: 53 })
  vatPercentage: number | null;

  @Column("bit", { name: "vat_visibility", nullable: true })
  vatVisibility: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @Column("datetime", {
    name: "last_update",
    nullable: true,
    default: () => "getutcdate()",
  })
  lastUpdate: Date | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.invoiceSettings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
