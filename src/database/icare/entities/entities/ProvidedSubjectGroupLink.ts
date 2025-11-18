import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProvidedSubjectGroup } from "./ProvidedSubjectGroup";
import { CenterProvidedSubjects } from "./CenterProvidedSubjects";

@Index("PK__Provided__DC759789B5C956C8", ["subjectGroupLinkId"], {
  unique: true,
})
@Entity("Provided_Subject_Group_Link", { schema: "dbo" })
export class ProvidedSubjectGroupLink {
  @PrimaryGeneratedColumn({ type: "int", name: "subject_group_link_id" })
  subjectGroupLinkId: number;

  @ManyToOne(
    () => ProvidedSubjectGroup,
    (providedSubjectGroup) => providedSubjectGroup.providedSubjectGroupLinks
  )
  @JoinColumn([
    { name: "subject_group_id", referencedColumnName: "subjectGroupId" },
  ])
  subjectGroup: ProvidedSubjectGroup;

  @ManyToOne(
    () => CenterProvidedSubjects,
    (centerProvidedSubjects) => centerProvidedSubjects.providedSubjectGroupLinks
  )
  @JoinColumn([
    { name: "report_subject_id", referencedColumnName: "reportSubjectId" },
  ])
  reportSubject: CenterProvidedSubjects;
}
