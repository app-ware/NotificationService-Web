import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("GeofenceRaduis_Values", { schema: "dbo" })
export class GeofenceRaduisValues {
  @PrimaryGeneratedColumn({ type: "int", name: "geofence_raduis_id" })
  geofenceRaduisId: number;

  @Column("int", { name: "raduis_value", nullable: true })
  raduisValue: number | null;

  @Column("nvarchar", { name: "raduis_text", nullable: true })
  raduisText: string | null;
}
