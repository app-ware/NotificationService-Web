import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("beacon_id", ["beaconId"], {})
@Index("child_id", ["childId"], { unique: true })
@Index("child_id - beacon_id ", ["beaconId", "childId"], { unique: true })
@Entity("Child_beacon", { schema: "dbo" })
export class ChildBeacon {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "beacon_id", nullable: true })
  beaconId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;
}
