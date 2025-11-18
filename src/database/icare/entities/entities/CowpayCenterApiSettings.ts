import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK_Cowpay_Centers_Data", ["id"], { unique: true })
@Entity("Cowpay_Center_Api_Settings", { schema: "dbo" })
export class CowpayCenterApiSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("nvarchar", { name: "merchant_code", nullable: true })
  merchantCode: string | null;

  @Column("nvarchar", { name: "merchant_hash_key", nullable: true })
  merchantHashKey: string | null;

  @Column("nvarchar", { name: "access_token", nullable: true })
  accessToken: string | null;

  @Column("nvarchar", { name: "staging_access_token", nullable: true })
  stagingAccessToken: string | null;

  @Column("bit", { name: "is_enabled", nullable: true, default: () => "(0)" })
  isEnabled: boolean | null;

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

  @Column("nvarchar", {
    name: "default_customer_name",
    nullable: true,
    length: 50,
  })
  defaultCustomerName: string | null;

  @Column("nvarchar", {
    name: "default_customer_email",
    nullable: true,
    length: 50,
  })
  defaultCustomerEmail: string | null;

  @Column("nvarchar", {
    name: "default_customer_mobile",
    nullable: true,
    length: 50,
  })
  defaultCustomerMobile: string | null;

  @Column("nvarchar", {
    name: "default_payment_description",
    nullable: true,
    length: 50,
  })
  defaultPaymentDescription: string | null;

  @ManyToOne(
    () => CareCenter,
    (careCenter) => careCenter.cowpayCenterApiSettings,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
