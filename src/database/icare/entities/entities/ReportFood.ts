import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Report_food", { schema: "dbo" })
export class ReportFood {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "food_Code", nullable: true })
  foodCode: number | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 50 })
  description: string | null;
}
