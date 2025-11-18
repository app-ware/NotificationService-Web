import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sd_location", { schema: "dbo" })
export class SdLocation {
  @PrimaryGeneratedColumn({ type: "int", name: "location_id" })
  locationId: number;

  @Column("nvarchar", { name: "location_name", nullable: true })
  locationName: string | null;

  @Column("float", { name: "location_lng", nullable: true, precision: 53 })
  locationLng: number | null;

  @Column("float", { name: "location_lat", nullable: true, precision: 53 })
  locationLat: number | null;
}
