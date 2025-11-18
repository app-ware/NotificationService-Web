import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Child_Fees", { schema: "dbo" })
export class ChildFees {
  @PrimaryGeneratedColumn({ type: "int", name: "fee_id" })
  feeId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("decimal", {
    name: "payment",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  payment: number | null;

  @Column("int", { name: "currency", nullable: true })
  currency: number | null;

  @Column("date", { name: "fee_date", nullable: true })
  feeDate: Date | null;

  @Column("nvarchar", { name: "fee_desc", nullable: true })
  feeDesc: string | null;

  @Column("int", { name: "is_Deleted", nullable: true })
  isDeleted: number | null;

  @Column("nvarchar", { name: "SYID", nullable: true, length: 50 })
  syid: string | null;
}
