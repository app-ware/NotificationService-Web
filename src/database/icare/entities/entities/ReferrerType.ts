import { Column, Entity, Index } from "typeorm";

@Index("PK_Refer_Type", ["referrerTypeId"], { unique: true })
@Entity("Referrer_Type", { schema: "dbo" })
export class ReferrerType {
  @Column("int", { primary: true, name: "referrer_type_id" })
  referrerTypeId: number;

  @Column("nvarchar", { name: "referrer_type_title", nullable: true })
  referrerTypeTitle: string | null;
}
