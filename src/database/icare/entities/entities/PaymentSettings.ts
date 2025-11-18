import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Payment___F832C24DAD42612F", ["paymentSettingsId"], {
  unique: true,
})
@Entity("Payment_Settings", { schema: "dbo" })
export class PaymentSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "payment_settings_id" })
  paymentSettingsId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "upcoming_payment_days_range", nullable: true })
  upcomingPaymentDaysRange: number | null;
}
