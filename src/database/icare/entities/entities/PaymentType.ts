import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Payment_Type", { schema: "dbo" })
export class PaymentType {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "payment_type_id" })
  paymentTypeId: number;

  @Column("nvarchar", { name: "payment_type_title", nullable: true })
  paymentTypeTitle: string | null;
}
