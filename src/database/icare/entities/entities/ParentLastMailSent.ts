import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__ParentLa__3214EC27A5093F0B", ["id"], { unique: true })
@Entity("ParentLastMailSent", { schema: "dbo" })
export class ParentLastMailSent {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "parent_id", nullable: true })
  parentId: string | null;

  @Column("datetime", { name: "last_date_sent", nullable: true })
  lastDateSent: Date | null;
}
