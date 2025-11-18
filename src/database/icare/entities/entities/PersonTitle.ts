import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("title_id", ["personTitleId"], { unique: true })
@Entity("Person_Title", { schema: "dbo" })
export class PersonTitle {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "person_title_id" })
  personTitleId: number;

  @Column("nvarchar", { name: "person_title", nullable: true })
  personTitle: string | null;
}
