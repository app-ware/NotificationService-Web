import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Currency", ["id"], { unique: true })
@Entity("Currency", { schema: "dbo" })
export class Currency {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "currency_name", nullable: true, length: 50 })
  currencyName: string | null;

  @Column("nvarchar", { name: "currency_desc", nullable: true })
  currencyDesc: string | null;
}
