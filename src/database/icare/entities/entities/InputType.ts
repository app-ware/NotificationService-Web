import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Input_Type", { schema: "dbo" })
export class InputType {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "input_type_id", nullable: true })
  inputTypeId: number | null;

  @Column("nvarchar", { name: "input_type_desc", nullable: true })
  inputTypeDesc: string | null;

  @Column("bit", { name: "is_enabled", nullable: true })
  isEnabled: boolean | null;
}
