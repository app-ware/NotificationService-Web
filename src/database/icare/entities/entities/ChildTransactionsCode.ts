import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ChildTransactions_Code", { schema: "dbo" })
export class ChildTransactionsCode {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "transaction_code", nullable: true })
  transactionCode: number | null;

  @Column("nvarchar", { name: "transaction_type", nullable: true, length: 100 })
  transactionType: string | null;
}
