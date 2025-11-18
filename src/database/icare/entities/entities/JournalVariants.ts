import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Journal_Variants", { schema: "dbo" })
export class JournalVariants {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "food", nullable: true, length: 50 })
  food: string | null;

  @Column("nvarchar", { name: "childfeeling", nullable: true, length: 50 })
  childfeeling: string | null;

  @Column("nvarchar", { name: "learned", nullable: true, length: 512 })
  learned: string | null;

  @Column("nvarchar", { name: "learning", nullable: true, length: 512 })
  learning: string | null;

  @Column("nvarchar", { name: "developing", nullable: true, length: 512 })
  developing: string | null;

  @Column("nvarchar", { name: "leaderfeeling", nullable: true, length: 512 })
  leaderfeeling: string | null;

  @Column("int", { name: "serial", nullable: true })
  serial: number | null;
}
