import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Prospect_Action", ["prospectActionId"], { unique: true })
@Entity("Prospect_Action", { schema: "dbo" })
export class ProspectAction {
  @PrimaryGeneratedColumn({ type: "int", name: "prospect_action_id" })
  prospectActionId: number;

  @Column("int", { name: "prospect_id", nullable: true })
  prospectId: number | null;

  @Column("datetime", { name: "prospect_action_date", nullable: true })
  prospectActionDate: Date | null;

  @Column("nvarchar", { name: "prospect_action_desc", nullable: true })
  prospectActionDesc: string | null;

  @Column("int", { name: "prospect_action_status", nullable: true })
  prospectActionStatus: number | null;

  @Column("nvarchar", { name: "prospect_action_result", nullable: true })
  prospectActionResult: string | null;
}
