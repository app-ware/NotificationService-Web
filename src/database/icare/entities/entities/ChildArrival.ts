import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("arrival_date", ["arrivalDate"], {})
@Index("child_id", ["childId"], {})
@Index("child_id - arrival_Date", ["childId", "arrivalDate"], { unique: true })
@Index("PK__Child_Ar__CB45EA38030690AE", ["childArrivalId"], { unique: true })
@Entity("Child_Arrival", { schema: "dbo" })
export class ChildArrival {
  @PrimaryGeneratedColumn({ type: "int", name: "child_arrival_id" })
  childArrivalId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("date", { name: "arrival_date", nullable: true })
  arrivalDate: Date | null;

  @Column("time", { name: "arrival_time", nullable: true })
  arrivalTime: Date | null;

  @Column("bit", { name: "is_manual", nullable: true })
  isManual: boolean | null;
}
