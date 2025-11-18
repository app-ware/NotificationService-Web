import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Photo_Status_lkp", { schema: "dbo" })
export class PhotoStatusLkp {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "status_code", nullable: true })
  statusCode: number | null;

  @Column("nvarchar", {
    name: "status_description",
    nullable: true,
    length: 50,
  })
  statusDescription: string | null;
}
