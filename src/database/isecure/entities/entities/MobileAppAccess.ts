import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Mobile_App_Access", ["id"], { unique: true })
@Entity("Mobile_App_Access", { schema: "dbo" })
export class MobileAppAccess {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "user_name", nullable: true, length: 100 })
  userName: string | null;

  @Column("int", { name: "device_type", nullable: true })
  deviceType: number | null;

  @Column("varchar", { name: "app_bundle", nullable: true, length: 100 })
  appBundle: string | null;

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

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

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

  @Column("bit", {
    name: "is_authorized",
    nullable: true,
    default: () => "(0)",
  })
  isAuthorized: boolean | null;
}
