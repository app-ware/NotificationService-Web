import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("child_id", ["childId"], {})
@Index("child_id - departure_date", ["childId", "departureDate"], {
  unique: true,
})
@Index("departure_date", ["departureDate"], {})
@Index("PK__Child_De__020C3E0184A762B4", ["childDepartureId"], { unique: true })
@Entity("Child_Departure", { schema: "dbo" })
export class ChildDeparture {
  @PrimaryGeneratedColumn({ type: "int", name: "child_departure_id" })
  childDepartureId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("date", { name: "departure_date", nullable: true })
  departureDate: Date | null;

  @Column("time", { name: "departure_time", nullable: true })
  departureTime: Date | null;

  @Column("bit", { name: "is_manual", nullable: true })
  isManual: boolean | null;
}
