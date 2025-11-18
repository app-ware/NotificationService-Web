import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("class_id", ["classId"], {})
@Index("list_id", ["listId"], {})
@Index("list_id - numericvalue", ["numericvalue", "listId"], {})
@Index("PK__ListValu__C5B196021510ABE1", ["uid"], { unique: true })
@Entity("ListValues", { schema: "dbo" })
export class ListValues {
  @PrimaryGeneratedColumn('increment',{
    name: "UID",
  })
  uid: number;

  @Column("numeric", {
    name: "numericvalue",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  numericvalue: number | null;

  @Column("numeric", {
    name: "class_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  classId: number | null;

  @Column("nvarchar", { name: "description", nullable: true })
  description: string | null;

  @Column("nvarchar", { name: "description1", nullable: true })
  description1: string | null;

  @Column("nvarchar", { name: "description2", nullable: true })
  description2: string | null;

  @Column("numeric", {
    name: "list_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  listId: number | null;
}
