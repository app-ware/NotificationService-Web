import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DealerCenters } from "./DealerCenters";
import { DealerPageCenterAccess } from "./DealerPageCenterAccess";

@Index("PK_Dealers", ["dealerId"], { unique: true })
@Entity("Dealers", { schema: "dbo" })
export class Dealers {
  @PrimaryGeneratedColumn({ type: "int", name: "dealer_id" })
  dealerId: number;

  @Column("nvarchar", { name: "dealer_name", nullable: true, length: 450 })
  dealerName: string | null;

  @Column("nvarchar", { name: "username", nullable: true, length: 450 })
  username: string | null;

  @Column("binary", { name: "user_password", nullable: true, length: 64 })
  userPassword: Buffer | null;

  @Column("uniqueidentifier", { name: "password_salt", nullable: true })
  passwordSalt: string | null;

  @Column("nvarchar", { name: "user_email", nullable: true, length: 200 })
  userEmail: string | null;

  @Column("bit", {
    name: "is_super_admin",
    nullable: true,
    default: () => "(0)",
  })
  isSuperAdmin: boolean | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @Column("nvarchar", { name: "access_token", nullable: true, length: 450 })
  accessToken: string | null;

  @Column("datetime", { name: "last_session", nullable: true })
  lastSession: Date | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @OneToMany(() => DealerCenters, (dealerCenters) => dealerCenters.dealer)
  dealerCenters: DealerCenters[];

  @OneToMany(
    () => DealerPageCenterAccess,
    (dealerPageCenterAccess) => dealerPageCenterAccess.dealer
  )
  dealerPageCenterAccesses: DealerPageCenterAccess[];
}
