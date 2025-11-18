import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("center_id", ["centerId"], {})
@Index("PK_Status", ["statusId"], { unique: true })
@Entity("Status", { schema: "dbo" })
export class Status {
  @PrimaryGeneratedColumn({ type: "int", name: "status_id" })
  statusId: number;

  @Column("nvarchar", { name: "status_logo", nullable: true })
  statusLogo: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "status_description", nullable: true })
  statusDescription: string | null;

  @Column("nvarchar", { name: "status_description1", nullable: true })
  statusDescription1: string | null;

  @Column("nvarchar", { name: "status_description2", nullable: true })
  statusDescription2: string | null;

  @Column("int", { name: "status_order", nullable: true })
  statusOrder: number | null;

  @Column("bit", { name: "deleted", nullable: true, default: () => "(0)" })
  deleted: boolean | null;
}
