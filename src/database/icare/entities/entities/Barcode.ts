import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Barcode", ["barcodeId"], { unique: true })
@Entity("Barcode", { schema: "dbo" })
export class Barcode {
  @PrimaryGeneratedColumn({ type: "int", name: "barcode_id" })
  barcodeId: number;

  @Column("nvarchar", { name: "barcode_mac", nullable: true })
  barcodeMac: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
