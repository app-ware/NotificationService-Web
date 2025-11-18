import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("bus_id - timestamp - trip_id", ["busId", "timeStamp", "tripId"], {})
@Index("PK__Bus__3214EC2764F9F23D", ["id"], { unique: true })
@Entity("Bus", { schema: "dbo" })
export class Bus {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "bus_id", nullable: true })
  busId: number | null;

  @Column("datetime", { name: "TimeStamp", nullable: true })
  timeStamp: Date | null;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "lng", nullable: true, precision: 53 })
  lng: number | null;

  @Column("float", { name: "bus_speed", nullable: true, precision: 53 })
  busSpeed: number | null;

  @Column("int", { name: "trip_id", nullable: true })
  tripId: number | null;

  @Column("float", { name: "accuracy", nullable: true, precision: 53 })
  accuracy: number | null;
}
