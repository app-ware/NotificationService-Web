import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Dummy_NF__3213E83F0831566B", ["id"], { unique: true })
@Entity("Dummy_NFC", { schema: "dbo" })
export class DummyNfc {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "dummy_nfc_code", nullable: true })
  dummyNfcCode: string | null;

  @Column("datetime", {
    name: "modified_date",
    nullable: true,
    default: () => "getdate()",
  })
  modifiedDate: Date | null;
}
