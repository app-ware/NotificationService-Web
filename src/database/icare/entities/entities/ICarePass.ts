import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("iCarePass", { schema: "dbo" })
export class ICarePass {
  @PrimaryGeneratedColumn({ type: "int", name: "Recordnr" })
  recordnr: number;

  @Column("nvarchar", { name: "UserName", nullable: true, length: 64 })
  userName: string | null;

  @Column("nvarchar", { name: "DeviceID", nullable: true, length: 64 })
  deviceId: string | null;

  @Column("datetime", { name: "LastAccess", nullable: true })
  lastAccess: Date | null;

  @Column("nvarchar", { name: "Token", nullable: true, length: 64 })
  token: string | null;

  @Column("nvarchar", { name: "CenterName", nullable: true, length: 64 })
  centerName: string | null;

  @Column("int", { name: "IsActive", nullable: true })
  isActive: number | null;

  @Column("int", { name: "AdminUserID", nullable: true })
  adminUserId: number | null;
}
