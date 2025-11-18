import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Child_Lo__0A47AA848A6DCB0E", ["childLocationId"], { unique: true })
@Entity("Child_Location", { schema: "dbo" })
export class ChildLocation {
  @PrimaryGeneratedColumn({ type: "int", name: "child_location_id" })
  childLocationId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("float", { name: "location_lat", nullable: true, precision: 53 })
  locationLat: number | null;

  @Column("float", { name: "location_lng", nullable: true, precision: 53 })
  locationLng: number | null;

  @Column("nvarchar", { name: "location_text", nullable: true })
  locationText: string | null;

  @Column("datetime", {
    name: "last_update",
    nullable: true,
    default: () => "getutcdate()",
  })
  lastUpdate: Date | null;
}
