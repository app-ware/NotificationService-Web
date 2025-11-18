import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sec_userroles_bk", { schema: "dbo" })
export class SecUserrolesBk {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "UserID", nullable: true })
  userId: number | null;

  @Column("int", { name: "RoleID", nullable: true })
  roleId: number | null;
}
