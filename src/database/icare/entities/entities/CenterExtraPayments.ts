import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_Extra_Payments", ["extraPaymentId"], { unique: true })
@Entity("Center_Extra_Payments", { schema: "dbo" })
export class CenterExtraPayments {
  @PrimaryGeneratedColumn({ type: "int", name: "extra_payment_id" })
  extraPaymentId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "extra_payment_title", nullable: true })
  extraPaymentTitle: string | null;

  @Column("nvarchar", { name: "extra_payment_desc", nullable: true })
  extraPaymentDesc: string | null;

  @Column("float", {
    name: "extra_payment_amount",
    nullable: true,
    precision: 53,
  })
  extraPaymentAmount: number | null;

  @Column("date", { name: "due_date", nullable: true })
  dueDate: Date | null;

  @Column("int", { name: "term_id", nullable: true })
  termId: number | null;

  @Column("int", { name: "academic_year", nullable: true })
  academicYear: number | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;
}
