import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Trip_Type", { schema: "dbo" })
export class TripType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "trip_type_id" })
  tripTypeId: number;

  @Column("nvarchar", { name: "trip_type_name", nullable: true })
  tripTypeName: string | null;
}
