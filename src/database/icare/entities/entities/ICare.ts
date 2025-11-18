import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_iCare", ["aboutIcareId"], { unique: true })
@Entity("iCare", { schema: "dbo" })
export class ICare {
  @PrimaryGeneratedColumn({ type: "int", name: "about_icare_id" })
  aboutIcareId: number;

  @Column("nvarchar", { name: "about_icare_phone", nullable: true, length: 50 })
  aboutIcarePhone: string | null;

  @Column("nvarchar", {
    name: "about_icare_mobile",
    nullable: true,
    length: 50,
  })
  aboutIcareMobile: string | null;

  @Column("nvarchar", {
    name: "about_icare_address",
    nullable: true,
    length: 500,
  })
  aboutIcareAddress: string | null;

  @Column("nvarchar", { name: "about_icare_email", nullable: true, length: 50 })
  aboutIcareEmail: string | null;

  @Column("nvarchar", { name: "about_icare_logo", nullable: true, length: 50 })
  aboutIcareLogo: string | null;

  @Column("nvarchar", { name: "about_icare_Description", nullable: true })
  aboutIcareDescription: string | null;

  @Column("nvarchar", { name: "Website", nullable: true, length: 100 })
  website: string | null;
}
