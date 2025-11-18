import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CowpayOrderStatus } from "./CowpayOrderStatus";

@Index("PK_Cowpay_Payments", ["id"], { unique: true })
@Entity("Cowpay_Payments", { schema: "dbo" })
export class CowpayPayments {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("int", { name: "payment_id", nullable: true })
  paymentId: number | null;

  @Column("int", { name: "payment_type", nullable: true })
  paymentType: number | null;

  @Column("int", { name: "installment_id", nullable: true })
  installmentId: number | null;

  @Column("int", { name: "installment_type", nullable: true })
  installmentType: number | null;

  @Column("nvarchar", { name: "merchant_reference_id", nullable: true })
  merchantReferenceId: string | null;

  @Column("nvarchar", { name: "customer_merchant_profile_id", nullable: true })
  customerMerchantProfileId: string | null;

  @Column("nvarchar", { name: "payment_gateway_reference_id", nullable: true })
  paymentGatewayReferenceId: string | null;

  @Column("nvarchar", { name: "cowpay_reference_id", nullable: true })
  cowpayReferenceId: string | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(
    () => CowpayOrderStatus,
    (cowpayOrderStatus) => cowpayOrderStatus.cowpayPayments
  )
  @JoinColumn([
    { name: "order_status", referencedColumnName: "orderStatusValue" },
  ])
  orderStatus: CowpayOrderStatus;
}
