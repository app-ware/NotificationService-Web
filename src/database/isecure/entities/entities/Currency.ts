import { Column, Entity, Index } from "typeorm";

@Index("PK_Currency", ["currencyId"], { unique: true })
@Entity("Currency", { schema: "dbo" })
export class Currency {
  @Column("int", { primary: true, name: "currency_id" })
  currencyId: number;

  @Column("nvarchar", { name: "currency_name", nullable: true, length: 50 })
  currencyName: string | null;

  @Column("nvarchar", { name: "currency_desc", nullable: true, length: 100 })
  currencyDesc: string | null;
}
