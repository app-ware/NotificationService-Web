import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Bus_Sett__9D4144E463736233", ["busSettingsId"], { unique: true })
@Entity("Bus_Settings", { schema: "dbo" })
export class BusSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "bus_settings_id" })
  busSettingsId: number;

  @Column("int", { name: "bus_id", nullable: true })
  busId: number | null;

  @Column("int", { name: "geofence_raduis", nullable: true })
  geofenceRaduis: number | null;

  @Column("int", { name: "dwell_duration", nullable: true })
  dwellDuration: number | null;

  @Column("int", { name: "passenger_input_type", nullable: true })
  passengerInputType: number | null;
}
