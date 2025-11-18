import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Report_mood", { schema: "dbo" })
export class ReportMood {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "mood_code", nullable: true })
  moodCode: number | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 50 })
  description: string | null;
}
