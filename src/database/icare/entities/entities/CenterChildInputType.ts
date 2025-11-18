import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_Child_Input_Type", ["id"], { unique: true })
@Entity("Center_Child_Input_Type", { schema: "dbo" })
export class CenterChildInputType {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "input_type_id", nullable: true })
  inputTypeId: number | null;
}
