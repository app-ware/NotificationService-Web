import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Center_R__3214EC2708A089FA", ["id"], { unique: true })
@Index("unique_CenterID", ["centerId"], { unique: true })
@Entity("Center_Reports_Next_Number", { schema: "dbo" })
export class CenterReportsNextNumber {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "CenterID", unique: true, length: 255 })
  centerId: string;

  @Column("int", { name: "Invoice_Next_Number" })
  invoiceNextNumber: number;

  @Column("int", { name: "Receipt_Next_Number" })
  receiptNextNumber: number;
}
