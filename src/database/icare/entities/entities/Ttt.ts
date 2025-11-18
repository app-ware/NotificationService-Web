import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ttt", { schema: "dbo" })
export class Ttt {
  @Column("int", { name: "roleid" })
  roleid: number;

  @PrimaryGeneratedColumn({ type: "int", name: "menuID" })
  menuId: number;
}
