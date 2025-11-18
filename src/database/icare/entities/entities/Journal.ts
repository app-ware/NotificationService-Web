import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Journal", { schema: "dbo" })
export class Journal {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "Journaldate" })
  journaldate: Date;

  @Column("int", { name: "child_id" })
  childId: number;

  @Column("int", { name: "breakfast", nullable: true })
  breakfast: number | null;

  @Column("int", { name: "snack", nullable: true })
  snack: number | null;

  @Column("int", { name: "lunch", nullable: true })
  lunch: number | null;

  @Column("int", { name: "childfeeling", nullable: true })
  childfeeling: number | null;

  @Column("nvarchar", { name: "learned", nullable: true })
  learned: string | null;

  @Column("nvarchar", { name: "learning", nullable: true })
  learning: string | null;

  @Column("nvarchar", { name: "developing", nullable: true })
  developing: string | null;

  @Column("nvarchar", { name: "leaderfeeling", nullable: true })
  leaderfeeling: string | null;

  @Column("nvarchar", { name: "leaderremarks", nullable: true })
  leaderremarks: string | null;

  @Column("nvarchar", { name: "parentremarks", nullable: true })
  parentremarks: string | null;

  @Column("int", { name: "isapproved", nullable: true })
  isapproved: number | null;

  @Column("int", { name: "isread", nullable: true })
  isread: number | null;

  @Column("nvarchar", { name: "notes", nullable: true })
  notes: string | null;

  @Column("int", { name: "attend", nullable: true })
  attend: number | null;
}
