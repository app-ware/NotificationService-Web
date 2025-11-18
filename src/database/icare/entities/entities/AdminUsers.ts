import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterInvoicing } from "./CenterInvoicing";

@Index("PK_AdminUsers", ["id"], { unique: true })
@Entity("AdminUsers", { schema: "dbo" })
export class AdminUsers {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "UserName", nullable: true, length: 64 })
  userName: string | null;

  @Column("nvarchar", { name: "Password", nullable: true, length: 64 })
  password: string | null;

  @Column("nvarchar", { name: "email", nullable: true, length: 64 })
  email: string | null;

  @Column("nvarchar", { name: "isAdmin", nullable: true, length: 64 })
  isAdmin: string | null;

  @Column("nvarchar", { name: "Name", nullable: true, length: 64 })
  name: string | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @OneToMany(
    () => CenterInvoicing,
    (centerInvoicing) => centerInvoicing.adminUser
  )
  centerInvoicings: CenterInvoicing[];
}
