import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "bus_id-trip_id-_trip_date",
  ["childId", "childStatus", "busId", "tripId", "tripDate"],
  {}
)
@Entity("Child_TripStatus", { schema: "dbo" })
export class ChildTripStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "childTrip_status_id" })
  childTripStatusId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "bus_id", nullable: true })
  busId: number | null;

  @Column("int", { name: "trip_id", nullable: true })
  tripId: number | null;

  @Column("date", { name: "trip_date", nullable: true })
  tripDate: Date | null;

  @Column("int", { name: "child_status", nullable: true })
  childStatus: number | null;

  @Column("datetime", {
    name: "last_update",
    nullable: true,
    default: () => "getutcdate()",
  })
  lastUpdate: Date | null;
}
