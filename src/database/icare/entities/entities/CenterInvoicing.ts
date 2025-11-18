import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdminUsers } from "./AdminUsers";
import { CareCenter } from "./CareCenter";

@Index("PK_Center_Invoicing", ["id"], { unique: true })
@Entity("Center_Invoicing", { schema: "dbo" })
export class CenterInvoicing {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("datetime", { name: "download_time", nullable: true })
  downloadTime: Date | null;

  @ManyToOne(() => AdminUsers, (adminUsers) => adminUsers.centerInvoicings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "admin_user_id", referencedColumnName: "id" }])
  adminUser: AdminUsers;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.centerInvoicings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
