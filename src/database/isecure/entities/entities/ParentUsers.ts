import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterTypes } from "./CenterTypes";

@Index("[Unique-[parent_linked_id-center_type]]]", ["parentId", "centerType"], {
  unique: true,
})
@Index("PK_Parent_Users", ["id"], { unique: true })
@Index("username", ["username"], { unique: true })
@Entity("Parent_Users", { schema: "dbo" })
export class ParentUsers {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "username", nullable: true, length: 450 })
  username: string | null;

  @Column("nvarchar", {
    name: "formatted_user_name",
    nullable: true,
    length: 450,
  })
  formattedUserName: string | null;

  @Column("nvarchar", { name: "user_password", nullable: true, length: 450 })
  userPassword: string | null;

  @Column("nvarchar", { name: "parent_id", nullable: true, length: 250 })
  parentId: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @Column("nvarchar", { name: "access_token", nullable: true, length: 450 })
  accessToken: string | null;

  @Column("datetime", { name: "last_session", nullable: true })
  lastSession: Date | null;

  @ManyToOne(() => CenterTypes, (centerTypes) => centerTypes.parentUsers)
  @JoinColumn([{ name: "center_type", referencedColumnName: "centerTypeId" }])
  centerType2: CenterTypes;
}
