import { Column, Entity, Index } from "typeorm";

@Index("PK_Date_Formats", ["id"], { unique: true })
@Entity("Date_Formats", { schema: "dbo" })
export class DateFormats {
  @Column("int", { primary: true, name: "ID" })
  id: number;

  @Column("nvarchar", { name: "date_format", nullable: true, length: 50 })
  dateFormat: string | null;
}
