import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProvidedSubjectGroupLink } from "./ProvidedSubjectGroupLink";

@Index("PK__Provided__10DEFB4EF41C2E3D", ["subjectGroupId"], { unique: true })
@Entity("Provided_Subject_Group", { schema: "dbo" })
export class ProvidedSubjectGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "subject_group_id" })
  subjectGroupId: number;

  @Column("nvarchar", { name: "subject_group_name", nullable: true })
  subjectGroupName: string | null;

  @Column("nvarchar", { name: "subject_group_description", nullable: true })
  subjectGroupDescription: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;

  @Column("nvarchar", { name: "subject_group_name1", nullable: true })
  subjectGroupName1: string | null;

  @OneToMany(
    () => ProvidedSubjectGroupLink,
    (providedSubjectGroupLink) => providedSubjectGroupLink.subjectGroup
  )
  providedSubjectGroupLinks: ProvidedSubjectGroupLink[];
}
