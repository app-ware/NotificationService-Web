import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("class_id", ["classId"], {})
@Index("class_id - list_identifier", ["classId", "listIdentifier"], {})
@Index("class_id - type", ["type", "classId"], {})
@Index("list_id", ["listId"], { unique: true })
@Index("PK__ListTitl__7B9EF135D39516C6", ["listId"], { unique: true })
@Entity("ListTitle", { schema: "dbo" })
export class ListTitle {
  @PrimaryGeneratedColumn('increment',{ name: "list_id", })
  listId: number;

  @Column("numeric", { name: "Type", nullable: true, precision: 18, scale: 0 })
  type: number | null;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("numeric", {
    name: "list_identifier",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  listIdentifier: number | null;

  @Column("char", { name: "visibility", nullable: true, length: 1 })
  visibility: string | null;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("nvarchar", { name: "Title1", nullable: true, length: 255 })
  title1: string | null;

  @Column("nvarchar", { name: "Title2", nullable: true, length: 255 })
  title2: string | null;

  @Column("nvarchar", { name: "Tab", nullable: true, length: 255 })
  tab: string | null;

  @Column("nvarchar", { name: "Tab1", nullable: true, length: 255 })
  tab1: string | null;

  @Column("nvarchar", { name: "Tab2", nullable: true, length: 255 })
  tab2: string | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;
}
