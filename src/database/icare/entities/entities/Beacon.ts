import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("beacon_id", ["beaconId"], { unique: true })
@Entity("Beacon", { schema: "dbo" })
export class Beacon {
  @PrimaryGeneratedColumn({ type: "int", name: "beacon_id" })
  beaconId: number;

  @Column("nvarchar", { name: "beacon_mac", nullable: true })
  beaconMac: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
