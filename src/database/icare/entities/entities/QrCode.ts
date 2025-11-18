import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_QR_Code", ["qrCodeId"], { unique: true })
@Entity("QR_Code", { schema: "dbo" })
export class QrCode {
  @PrimaryGeneratedColumn({ type: "int", name: "QR_code_id" })
  qrCodeId: number;

  @Column("varchar", { name: "QR_value", nullable: true })
  qrValue: string | null;
}
