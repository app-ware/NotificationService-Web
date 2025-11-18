import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Prospects", ["prospectId"], { unique: true })
@Entity("Prospects", { schema: "dbo" })
export class Prospects {
  @PrimaryGeneratedColumn({ type: "int", name: "prospect_id" })
  prospectId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "prospect_name", nullable: true })
  prospectName: string | null;

  @Column("nvarchar", { name: "prospect_mobile", nullable: true })
  prospectMobile: string | null;

  @Column("nvarchar", { name: "prospect_email", nullable: true })
  prospectEmail: string | null;

  @Column("int", { name: "prospect_status", nullable: true })
  prospectStatus: number | null;

  @Column("int", { name: "referrer_type", nullable: true })
  referrerType: number | null;

  @Column("nvarchar", { name: "referrer_title", nullable: true })
  referrerTitle: string | null;

  @Column("bit", { name: "is_registered", nullable: true })
  isRegistered: boolean | null;

  @Column("nvarchar", { name: "registration_id", nullable: true })
  registrationId: string | null;

  @Column("int", { name: "prospect_title", nullable: true })
  prospectTitle: number | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;
}
