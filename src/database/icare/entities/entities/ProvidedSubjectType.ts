import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Provided__6B6418FBF61F887D", ["subjectTypeId"], { unique: true })
@Entity("Provided_Subject_Type", { schema: "dbo" })
export class ProvidedSubjectType {
  @PrimaryGeneratedColumn({ type: "int", name: "subject_type_id" })
  subjectTypeId: number;

  @Column("nvarchar", { name: "subject_type_name", nullable: true })
  subjectTypeName: string | null;
}
