import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "bus_id-trip_id-trip_date-is_canceled-INCLUDE-child_id",
  ["childId", "busId", "tripId", "tripDate", "isCanceled"],
  {}
)
@Index("PK_Child_Trip_Exception", ["childTripExceptionId"], { unique: true })
@Entity("Child_Trip_Exception", { schema: "dbo" })
export class ChildTripException {
  @PrimaryGeneratedColumn({ type: "int", name: "child_trip_exception_id" })
  childTripExceptionId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "bus_id", nullable: true })
  busId: number | null;

  @Column("int", { name: "trip_id", nullable: true })
  tripId: number | null;

  @Column("int", { name: "trip_type", nullable: true })
  tripType: number | null;

  @Column("date", { name: "trip_date", nullable: true })
  tripDate: Date | null;

  @Column("nvarchar", { name: "exception_reason", nullable: true })
  exceptionReason: string | null;

  @Column("bit", { name: "is_canceled", nullable: true, default: () => "(0)" })
  isCanceled: boolean | null;
}
