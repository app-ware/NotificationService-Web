import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Language", ["id"], { unique: true })
@Entity("Language", { schema: "dbo" })
export class Language {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Language_Name", nullable: true, length: 250 })
  languageName: string | null;

  @Column("nvarchar", { name: "Language_Flag", nullable: true, length: 50 })
  languageFlag: string | null;

  @Column("int", { name: "Language_Level", nullable: true })
  languageLevel: number | null;

  @Column("int", { name: "CareCenter_ID", nullable: true })
  careCenterId: number | null;
}
