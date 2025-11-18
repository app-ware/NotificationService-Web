import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Bus_Trip", { schema: "dbo" })
export class BusTrip {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "bus_id", nullable: true })
  busId: number | null;

  @Column("int", { name: "trip_id", nullable: true })
  tripId: number | null;
}
