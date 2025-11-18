import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("NonClusteredIndex-20151017-092855", ["childId", "transactionCode"], {})
@Index("PK__Child_Tr__3214EC2771712B45", ["id"], { unique: true })
@Entity("Child_Transactions", { schema: "dbo" })
export class ChildTransactions {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("nvarchar", { name: "child_name", nullable: true })
  childName: string | null;

  @Column("nvarchar", { name: "type", nullable: true })
  type: string | null;

  @Column("datetime", { name: "transaction_date", nullable: true })
  transactionDate: Date | null;

  @Column("int", { name: "transaction_code", nullable: true })
  transactionCode: number | null;

  @Column("bit", { name: "child_is_active_on_restore", nullable: true })
  childIsActiveOnRestore: boolean | null;
}
