import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Recurren__3214EC272918B1D1", ["id"], { unique: true })
@Entity("Recurrence", { schema: "dbo" })
export class Recurrence {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "NAME", length: 255 })
  name: string;

  @Column("int", { name: "occurs_every", nullable: true })
  occursEvery: number | null;
}
