import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_NFC", ["nfcId"], { unique: true })
@Entity("NFC", { schema: "dbo" })
export class Nfc {
  @PrimaryGeneratedColumn({ type: "int", name: "nfc_id" })
  nfcId: number;

  @Column("nvarchar", { name: "nfc_mac", nullable: true })
  nfcMac: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
