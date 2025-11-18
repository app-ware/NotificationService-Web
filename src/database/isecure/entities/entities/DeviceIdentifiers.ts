import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("device_identifier-device_type", ["deviceIdentifier", "deviceType"], {
  unique: true,
})
@Index("PK_Device_Identifiers", ["id"], { unique: true })
@Entity("Device_Identifiers", { schema: "dbo" })
export class DeviceIdentifiers {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "device_identifier", nullable: true, length: 50 })
  deviceIdentifier: string | null;

  @Column("nvarchar", { name: "device_name", nullable: true })
  deviceName: string | null;

  @Column("int", { name: "device_type", nullable: true })
  deviceType: number | null;
}
