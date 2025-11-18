import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Sec_User__3214EC27349DBB7C", ["id"], { unique: true })
@Entity("Sec_UserRoles", { schema: "dbo" })
export class SecUserRoles {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "UserID", nullable: true })
  userId: number | null;

  @Column("int", { name: "RoleID", nullable: true })
  roleId: number | null;
}
