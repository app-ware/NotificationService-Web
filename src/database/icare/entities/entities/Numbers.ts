import { Column, Entity, Index } from "typeorm";

@Index("PK_Numbers", ["number"], { unique: true })
@Entity("Numbers", { schema: "dbo" })
export class Numbers {
  @Column("int", { primary: true, name: "Number" })
  number: number;
}
