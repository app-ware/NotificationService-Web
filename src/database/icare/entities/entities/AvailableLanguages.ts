import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Available_Languages", { schema: "dbo" })
export class AvailableLanguages {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Language_name", nullable: true, length: 50 })
  languageName: string | null;

  @Column("nvarchar", { name: "Language_flag", nullable: true, length: 50 })
  languageFlag: string | null;

  @Column("nvarchar", { name: "Direction", nullable: true, length: 50 })
  direction: string | null;
}
