import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Trip__302A5D9EF9B902B8", ["tripId"], { unique: true })
@Entity("Trip", { schema: "dbo" })
export class Trip {
  @PrimaryGeneratedColumn({ type: "int", name: "trip_id" })
  tripId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "trip_name", nullable: true })
  tripName: string | null;

  @Column("int", { name: "trip_type", nullable: true })
  tripType: number | null;

  @Column("int", { name: "source_id", nullable: true })
  sourceId: number | null;

  @Column("int", { name: "dest_id", nullable: true })
  destId: number | null;

  @Column("time", { name: "trip_start_time", nullable: true })
  tripStartTime: Date | null;
}
