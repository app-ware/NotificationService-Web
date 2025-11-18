import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SecUsers } from "./SecUsers";

@Index("PK_Center_User_Device_Registration", ["id"], { unique: true })
@Entity("Center_User_Device_Registration", { schema: "dbo" })
export class CenterUserDeviceRegistration {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "device_type", nullable: true })
  deviceType: number | null;

  @Column("nvarchar", { name: "device_token", nullable: true })
  deviceToken: string | null;

  @Column("datetime", {
    name: "registration_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  registrationDate: Date | null;

  @Column("nvarchar", { name: "device_model", nullable: true, length: 50 })
  deviceModel: string | null;

  @Column("int", { name: "device_os_version", nullable: true })
  deviceOsVersion: number | null;

  @ManyToOne(
    () => SecUsers,
    (secUsers) => secUsers.centerUserDeviceRegistrations,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: SecUsers;
}
