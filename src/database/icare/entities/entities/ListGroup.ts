import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__ListGrou__D57795A0ECA78F71", ["groupId"], { unique: true })
@Entity("ListGroup", { schema: "dbo" })
export class ListGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "group_id" })
  groupId: number;

  @Column("numeric", {
    name: "list_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  listId: number | null;

  @Column("int", { name: "group_order", nullable: true })
  groupOrder: number | null;

  @Column("bit", { name: "visibility", nullable: true })
  visibility: boolean | null;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("nvarchar", { name: "Title1", nullable: true, length: 255 })
  title1: string | null;

  @Column("nvarchar", { name: "Title2", nullable: true, length: 255 })
  title2: string | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;
}
