import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Tokens", { schema: "dbo" })
export class Tokens {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "UserID", nullable: true, length: 50 })
  userId: string | null;

  @Column("nvarchar", { name: "Token", nullable: true, length: 50 })
  token: string | null;

  @Column("datetime", { name: "LastUpdate", nullable: true })
  lastUpdate: Date | null;
}
