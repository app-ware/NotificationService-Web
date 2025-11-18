import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "child_id-input_type-INCLUDE-input_id",
  ["inputId", "childId", "inputType"],
  {}
)
@Index("PK_Child_inputs", ["childInputId"], { unique: true })
@Entity("Child_Inputs", { schema: "dbo" })
export class ChildInputs {
  @PrimaryGeneratedColumn({ type: "int", name: "child_input_id" })
  childInputId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "input_id", nullable: true })
  inputId: number | null;

  @Column("int", { name: "input_type", nullable: true })
  inputType: number | null;
}
