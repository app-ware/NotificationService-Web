import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Prospect_Children", ["prospectChildId"], { unique: true })
@Entity("Prospect_Children", { schema: "dbo" })
export class ProspectChildren {
  @PrimaryGeneratedColumn({ type: "int", name: "prospect_child_id" })
  prospectChildId: number;

  @Column("int", { name: "prospect_id", nullable: true })
  prospectId: number | null;

  @Column("nvarchar", { name: "child_name", nullable: true })
  childName: string | null;

  @Column("nvarchar", { name: "child_special_needs", nullable: true })
  childSpecialNeeds: string | null;

  @Column("date", { name: "child_dob", nullable: true })
  childDob: Date | null;

  @Column("int", { name: "child_gender", nullable: true })
  childGender: number | null;

  @Column("bit", { name: "is_registered", nullable: true })
  isRegistered: boolean | null;

  @Column("int", { name: "registration_id", nullable: true })
  registrationId: number | null;

  @Column("bit", { name: "is_waiting", nullable: true })
  isWaiting: boolean | null;

  @Column("int", { name: "waiting_list_id", nullable: true })
  waitingListId: number | null;

  @Column("nvarchar", { name: "child_pin", nullable: true })
  childPin: string | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;
}
