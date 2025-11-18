import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterTypes } from "./CenterTypes";

@Index("PK_Center_Users", ["id"], { unique: true })
@Index(
  "Unique-[center_linked_id-center_type-center_user_id]",
  ["centerId", "centerUserId", "centerType"],
  { unique: true }
)
@Index("user_name", ["username"], { unique: true })
@Entity("Center_Users", { schema: "dbo" })
export class CenterUsers {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "username", nullable: false, length: 450 })
  username: string | null;

  @Column("nvarchar", {
    name: "formatted_user_name",
    nullable: true,
    length: 450,
  })
  formattedUserName: string | null;

  @Column("nvarchar", { name: "user_password", nullable: true, length: 255 })
  userPassword: string | null;

  // @Column("uniqueidentifier", { name: "password_salt", nullable: true })
  // passwordSalt: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_user_id", nullable: true })
  centerUserId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("bit", { name: "is_admin", nullable: true, default: () => "(0)" })
  isAdmin: boolean | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @Column("nvarchar", { name: "refresh_token", nullable: true, length: 450 })
  refreshToken: string | null;

  @Column("datetime", { name: "last_session", nullable: true })
  lastSession: Date | null;

  @ManyToOne(() => CenterTypes, (centerTypes) => centerTypes.centerUsers)
  @JoinColumn([{ name: "center_type", referencedColumnName: "centerTypeId" }])
  centerType2: CenterTypes;
}
