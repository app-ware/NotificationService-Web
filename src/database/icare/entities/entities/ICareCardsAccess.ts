import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_iCareCards_Access", ["recordId"], { unique: true })
@Entity("iCareCards_Access", { schema: "dbo" })
export class ICareCardsAccess {
  @PrimaryGeneratedColumn({ type: "int", name: "record_id" })
  recordId: number;

  @Column("varchar", { name: "user_name", nullable: true, length: 100 })
  userName: string | null;

  @Column("varchar", { name: "device_id", nullable: true, length: 100 })
  deviceId: string | null;

  @Column("varchar", { name: "device_model", nullable: true, length: 100 })
  deviceModel: string | null;

  @Column("varchar", { name: "device_brand", nullable: true, length: 100 })
  deviceBrand: string | null;

  @Column("varchar", { name: "device_serial", nullable: true, length: 100 })
  deviceSerial: string | null;

  @Column("nvarchar", { name: "token", nullable: true })
  token: string | null;

  @Column("datetime", { name: "last_access", nullable: true })
  lastAccess: Date | null;

  @Column("float", {
    name: "access_location_lat",
    nullable: true,
    precision: 53,
  })
  accessLocationLat: number | null;

  @Column("float", {
    name: "access_location_lng",
    nullable: true,
    precision: 53,
  })
  accessLocationLng: number | null;

  @Column("datetime", { name: "last_location_update", nullable: true })
  lastLocationUpdate: Date | null;

  @Column("bit", { name: "isActive", nullable: true, default: () => "(0)" })
  isActive: boolean | null;
}
