import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Gender", { schema: "dbo" })
export class Gender {
  
  @PrimaryGeneratedColumn()
  id: number;
  @Column("nvarchar", { name: "Gender_Text", nullable: true, length: 50 })
  genderText: string | null;

  @Column("int", { name: "Gender_Code", nullable: true })
  genderCode: number | null;
}
