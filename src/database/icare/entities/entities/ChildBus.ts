import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Child_Bus", ["id"], { unique: true })
@Entity("Child_Bus", { schema: "dbo" })
export class ChildBus {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "bus_id", nullable: true })
  busId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "SYID", nullable: true })
  syid: number | null;
}
