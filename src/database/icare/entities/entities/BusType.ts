import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChildPickup } from "./ChildPickup";

@Index("PK_Bus_Type", ["busTypeId"], { unique: true })
@Entity("Bus_Type", { schema: "dbo" })
export class BusType {
  @PrimaryGeneratedColumn({ type: "int", name: "bus_type_id" })
  busTypeId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "bus_type", nullable: true })
  busType: string | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("nvarchar", { name: "Driver_name", nullable: true, length: 50 })
  driverName: string | null;

  @Column("nvarchar", { name: "driver_mobile", nullable: true, length: 50 })
  driverMobile: string | null;

  @Column("numeric", {
    name: "bus_capacity",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  busCapacity: number | null;

  @Column("int", { name: "SYID", nullable: true })
  syid: number | null;

  @Column("nvarchar", { name: "bus_name", nullable: true })
  busName: string | null;

  @Column("nvarchar", { name: "bus_marker", nullable: true })
  busMarker: string | null;

  @Column("int", { name: "bus_max_speed", nullable: true })
  busMaxSpeed: number | null;

  @ManyToOne(() => ChildPickup, (childPickup) => childPickup.busTypes)
  @JoinColumn([{ name: "pickup_id", referencedColumnName: "pickupId" }])
  pickup: ChildPickup;
}
