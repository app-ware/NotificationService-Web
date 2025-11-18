import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Sec_Role__3214EC273BAE35C2", ["id"], { unique: true })
@Entity("Sec_Roles", { schema: "dbo" })
export class SecRoles {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 50 })
  name: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 250 })
  description: string | null;

  @Column("numeric", {
    name: "center_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  centerId: number | null;
}
