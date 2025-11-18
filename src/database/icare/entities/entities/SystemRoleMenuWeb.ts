import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__System_R__3214EC2759E35607", ["id"], { unique: true })
@Entity("System_Role_Menu_Web", { schema: "dbo" })
export class SystemRoleMenuWeb {
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

  @Column("bit", {
    name: "can_edit_page_data",
    nullable: true,
    default: () => "(1)",
  })
  canEditPageData: boolean | null;
}
