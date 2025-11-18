import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("working_NFC_Employee", { schema: "dbo" })
export class WorkingNfcEmployee {
  @PrimaryGeneratedColumn({ type: "bigint", name: "recID" })
  recId: string;

  @Column("bigint", { name: "employee_ID" })
  employeeId: string;

  @Column("nvarchar", { name: "NFC_ID", length: 50 })
  nfcId: string;

  @Column("nvarchar", { name: "center_ID", length: 50 })
  centerId: string;
}
