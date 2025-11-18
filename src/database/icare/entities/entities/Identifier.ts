import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Identifier", ["identityId"], { unique: true })
@Entity("Identifier", { schema: "dbo" })
export class Identifier {
  @PrimaryGeneratedColumn({ type: "int", name: "identity_id" })
  identityId: number;

  @Column("int", { name: "identifier_id" })
  identifierId: number;

  @Column("int", { name: "type", nullable: true })
  type: number | null;
}
