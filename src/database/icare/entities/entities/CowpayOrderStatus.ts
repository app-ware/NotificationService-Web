import { Column, Entity, Index, OneToMany } from "typeorm";
import { CowpayPayments } from "./CowpayPayments";

@Index("PK_Cowpay_Order_Status", ["orderStatusValue"], { unique: true })
@Entity("Cowpay_Order_Status", { schema: "dbo" })
export class CowpayOrderStatus {
  @Column("nvarchar", { primary: true, name: "order_status_value", length: 50 })
  orderStatusValue: string;

  @Column("nvarchar", {
    name: "order_status_description",
    nullable: true,
    length: 250,
  })
  orderStatusDescription: string | null;

  @OneToMany(
    () => CowpayPayments,
    (cowpayPayments) => cowpayPayments.orderStatus
  )
  cowpayPayments: CowpayPayments[];
}
