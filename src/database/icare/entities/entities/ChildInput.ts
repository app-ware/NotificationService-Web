import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Child_Input", ["childInputId"], { unique: true })
@Entity("Child_Input", { schema: "dbo" })
export class ChildInput {
  @PrimaryGeneratedColumn({ type: "int", name: "child_input_id" })
  childInputId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "nfc_id", nullable: true })
  nfcId: number | null;

  @Column("int", { name: "beacon_id", nullable: true })
  beaconId: number | null;

  @Column("int", { name: "barcode_id", nullable: true })
  barcodeId: number | null;
}
