import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Scholastic_Year", { schema: "dbo" })
export class ScholasticYear {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("date", { name: "Start_date", nullable: true })
  startDate: Date | null;

  @Column("date", { name: "End_Date", nullable: true })
  endDate: Date | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
