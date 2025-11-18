import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("DeviceType", { schema: "dbo" })
export class DeviceType {
  @PrimaryGeneratedColumn({ type: "int", name: "Device_ID" })
  deviceId: number;

  @Column("nvarchar", { name: "Device_Name", length: 100 })
  deviceName: string;
}
