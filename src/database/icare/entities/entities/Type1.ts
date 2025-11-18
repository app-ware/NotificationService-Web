import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("type1", { schema: "dbo" })
export class Type1 {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("int", { name: "menuID" })
  menuId: number;
}
