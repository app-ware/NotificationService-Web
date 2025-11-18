import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("center_id", ["centerId"], {})
@Index("PK__Center_T__4CCB0634E1FE0C98", ["termId"], { unique: true })
@Entity("Center_Term", { schema: "dbo" })
export class CenterTerm {
  @PrimaryGeneratedColumn({ type: "int", name: "term_id" })
  termId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "term_title", nullable: true })
  termTitle: string | null;

  @Column("nvarchar", { name: "term_description", nullable: true })
  termDescription: string | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;
}
