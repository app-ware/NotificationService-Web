import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__System_R__3214EC27DAC2148E", ["id"], { unique: true })
@Entity("System_Role_Menu", { schema: "dbo" })
export class SystemRoleMenu {
  @PrimaryGeneratedColumn('increment',{
    type: "numeric",
    name: "ID",
  })
  id: number;

  @Column("numeric", {
    name: "RoleID",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  roleId: number | null;

  @Column("numeric", {
    name: "menuID",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  menuId: number | null;
}
