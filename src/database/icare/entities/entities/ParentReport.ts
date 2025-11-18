import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("child_id", ["childId"], {})
@Index("PK_Parent_Reports", ["id"], { unique: true })
@Index("rDate", ["rDate"], {})
@Entity("Parent_Report", { schema: "dbo" })
export class ParentReport {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("numeric", {
    name: "child_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  childId: number | null;

  @Column("numeric", {
    name: "center_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  centerId: number | null;

  @Column("date", { name: "rDate", nullable: true })
  rDate: Date | null;

  @Column("nvarchar", { name: "rJSON", nullable: true })
  rJson: string | null;

  @Column("nvarchar", { name: "rJSON1", nullable: true })
  rJson1: string | null;

  @Column("nvarchar", { name: "rJSON2", nullable: true })
  rJson2: string | null;

  @Column("char", { name: "isRead", nullable: true, length: 1 })
  isRead: string | null;

  @Column("bit", {
    name: "is_admin_modified",
    nullable: true,
    default: () => "(0)",
  })
  isAdminModified: boolean | null;
}
