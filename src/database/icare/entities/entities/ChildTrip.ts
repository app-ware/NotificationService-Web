import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "bus_id-trip_id-weekday_id-INCLUDE-child_id",
  ["childId", "busId", "tripId", "weekdayId"],
  {}
)
@Index("child_id", ["childId"], {})
@Index(
  "child_id-trip_id-weekday",
  ["childId", "busId", "tripId", "weekdayId"],
  {}
)
@Index("PK_Child_Trip", ["childTripId"], { unique: true })
@Entity("Child_Trip", { schema: "dbo" })
export class ChildTrip {
  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "bus_id", nullable: true })
  busId: number | null;

  @Column("int", { name: "trip_id", nullable: true })
  tripId: number | null;

  @Column("int", { name: "weekday_id", nullable: true })
  weekdayId: number | null;

  @PrimaryGeneratedColumn({ type: "int", name: "child_trip_id" })
  childTripId: number;
}
