import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BusType } from "./BusType";

@Index("PK_Child_Pickup", ["pickupId"], { unique: true })
@Entity("Child_Pickup", { schema: "dbo" })
export class ChildPickup {
  @PrimaryGeneratedColumn({ type: "int", name: "pickup_id" })
  pickupId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "pickup_person_mobile", nullable: true })
  pickupPersonMobile: string | null;

  @Column("nvarchar", { name: "pickup_person_name", nullable: true })
  pickupPersonName: string | null;

  @Column("nvarchar", { name: "pickup_person_name1", nullable: true })
  pickupPersonName1: string | null;

  @Column("nvarchar", { name: "pickup_person_name2", nullable: true })
  pickupPersonName2: string | null;

  @Column("nvarchar", { name: "pickup_person_photo", nullable: true })
  pickupPersonPhoto: string | null;

  @OneToMany(() => BusType, (busType) => busType.pickup)
  busTypes: BusType[];
}
