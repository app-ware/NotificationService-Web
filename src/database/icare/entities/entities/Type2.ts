import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("type2", { schema: "dbo" })
export class Type2 {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("int", { name: "menuID" })
  menuId: number;
}
