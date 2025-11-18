import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Transition_Type", { schema: "dbo" })
export class TransitionType {
  @PrimaryGeneratedColumn({ type: "int", name: "transition_type_id" })
  transitionTypeId: number;

  @Column("nvarchar", { name: "transition_name", nullable: true })
  transitionName: string | null;
}
