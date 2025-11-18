import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Activation_Status", { schema: "dbo" })
export class ActivationStatus {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("nvarchar", { name: "Status_Text", nullable: true, length: 50 })
  statusText: string | null;

  @Column("int", { name: "Status_Code", nullable: true })
  statusCode: number | null;
}
