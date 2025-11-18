import { Column, Entity, Index } from "typeorm";

@Index("PK_Keys", ["keyIdentifier"], { unique: true })
@Entity("Keys", { schema: "dbo" })
export class Keys {
  @Column("nvarchar", { primary: true, name: "key_identifier", length: 50 })
  keyIdentifier: string;

  @Column("varbinary", { name: "key_value", nullable: true, length: 200 })
  keyValue: Buffer | null;

  @Column("nvarchar", { name: "pass_phrase", nullable: true, length: 100 })
  passPhrase: string | null;
}
