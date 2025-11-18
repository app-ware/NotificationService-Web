import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__MailBody__3214EC27334C075D", ["id"], { unique: true })
@Entity("MailBodyTemplate", { schema: "dbo" })
export class MailBodyTemplate {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "mail_body", nullable: true })
  mailBody: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @Column("bit", { name: "is_arabic", nullable: true })
  isArabic: boolean | null;

  @Column("bit", { name: "is_english", nullable: true })
  isEnglish: boolean | null;
}
