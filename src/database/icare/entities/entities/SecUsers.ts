import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterSmsLog } from "./CenterSmsLog";
import { CenterUserDeviceRegistration } from "./CenterUserDeviceRegistration";
import { SecUserClass } from "./SecUserClass";
import { CareCenter } from "./CareCenter";

@Index("IX_sec_users", ["id"], { unique: true })
@Index("PK_sec_users", ["id"], { unique: true })
@Entity("sec_users", { schema: "dbo" })
export class SecUsers {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Username", nullable: true, length: 50 })
  username: string | null;

  @Column("nvarchar", { name: "Password", nullable: true, length: 50 })
  password: string | null;

  @Column("nvarchar", { name: "Firstname", nullable: true, length: 50 })
  firstname: string | null;

  @Column("nvarchar", { name: "Lastname", nullable: true, length: 50 })
  lastname: string | null;

  @Column("nvarchar", { name: "Email", nullable: true, length: 50 })
  email: string | null;

  @Column("numeric", {
    name: "Type",
    nullable: true,
    precision: 18,
    scale: 0,
    default: () => "(1)",
  })
  type: number | null;

  @Column("nvarchar", {
    name: "ThemeColor",
    nullable: true,
    length: 45,
    default: () => "'499EC7'",
  })
  themeColor: string | null;

  @Column("bit", {
    name: "CkeckedSchedule",
    nullable: true,
    default: () => "(1)",
  })
  ckeckedSchedule: boolean | null;

  @Column("bit", {
    name: "CkeckedBirthDays",
    nullable: true,
    default: () => "(1)",
  })
  ckeckedBirthDays: boolean | null;

  @Column("bit", {
    name: "CkeckedEvents",
    nullable: true,
    default: () => "(1)",
  })
  ckeckedEvents: boolean | null;

  @Column("bit", {
    name: "CkeckedFoodMenus",
    nullable: true,
    default: () => "(1)",
  })
  ckeckedFoodMenus: boolean | null;

  @Column("bit", {
    name: "CkeckedReminderNote",
    nullable: true,
    default: () => "(1)",
  })
  ckeckedReminderNote: boolean | null;

  @Column("bit", {
    name: "classes_full_access",
    nullable: true,
    default: () => "(0)",
  })
  classesFullAccess: boolean | null;

  @Column("bit", {
    name: "CheckedProspects",
    nullable: true,
    default: () => "(1)",
  })
  checkedProspects: boolean | null;

  @OneToMany(() => CenterSmsLog, (centerSmsLog) => centerSmsLog.user)
  centerSmsLogs: CenterSmsLog[];

  @OneToMany(
    () => CenterUserDeviceRegistration,
    (centerUserDeviceRegistration) => centerUserDeviceRegistration.user
  )
  centerUserDeviceRegistrations: CenterUserDeviceRegistration[];

  @OneToMany(() => SecUserClass, (secUserClass) => secUserClass.user)
  secUserClasses: SecUserClass[];

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.secUsers)
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
