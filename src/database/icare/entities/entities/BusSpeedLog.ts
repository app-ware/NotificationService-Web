import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Bus_Spee__61E4F6D150236B7F", ["speedLogId"], { unique: true })
@Entity("Bus_Speed_Log", { schema: "dbo" })
export class BusSpeedLog {
  @PrimaryGeneratedColumn({ type: "int", name: "speed_log_id" })
  speedLogId: number;

  @Column("int", { name: "bus_id", nullable: true })
  busId: number | null;

  @Column("nvarchar", { name: "bus_name", nullable: true })
  busName: string | null;

  @Column("float", { name: "bus_speed", nullable: true, precision: 53 })
  busSpeed: number | null;

  @Column("datetime", {
    name: "log_timeStamp",
    nullable: true,
    default: () => "getdate()",
  })
  logTimeStamp: Date | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
