import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReportClassSubjectInfo } from "./AcademicReportClassSubjectInfo";
import { AcademicReportSubjects } from "./AcademicReportSubjects";
import { AcademicYearQuizes } from "./AcademicYearQuizes";
import { GradingReportChildTermSubjectGrade } from "./GradingReportChildTermSubjectGrade";
import { GradingReportSubjects } from "./GradingReportSubjects";
import { GradingReportTermQuizzes } from "./GradingReportTermQuizzes";
import { ProvidedSubjectGroupLink } from "./ProvidedSubjectGroupLink";
import { ProviderClassSubjects } from "./ProviderClassSubjects";

@Index("PK__Center_P__FDA43170E9934886", ["reportSubjectId"], { unique: true })
@Entity("Center_Provided_Subjects", { schema: "dbo" })
export class CenterProvidedSubjects {
  @PrimaryGeneratedColumn({ type: "int", name: "report_subject_id" })
  reportSubjectId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "report_subject_title", nullable: true })
  reportSubjectTitle: string | null;

  @Column("nvarchar", { name: "report_subject_description", nullable: true })
  reportSubjectDescription: string | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;

  @Column("float", { name: "subject_max_grade", nullable: true, precision: 53 })
  subjectMaxGrade: number | null;

  @Column("float", {
    name: "subject_pass_grade",
    nullable: true,
    precision: 53,
  })
  subjectPassGrade: number | null;

  @Column("float", { name: "subject_weight", nullable: true, precision: 53 })
  subjectWeight: number | null;

  @Column("nvarchar", { name: "report_subject_title1", nullable: true })
  reportSubjectTitle1: string | null;

  @OneToMany(
    () => AcademicReportClassSubjectInfo,
    (academicReportClassSubjectInfo) =>
      academicReportClassSubjectInfo.reportSubject
  )
  academicReportClassSubjectInfos: AcademicReportClassSubjectInfo[];

  @OneToMany(
    () => AcademicReportSubjects,
    (academicReportSubjects) => academicReportSubjects.reportSubject
  )
  academicReportSubjects: AcademicReportSubjects[];

  @OneToMany(
    () => AcademicYearQuizes,
    (academicYearQuizes) => academicYearQuizes.reportSubject
  )
  academicYearQuizes: AcademicYearQuizes[];

  @OneToMany(
    () => GradingReportChildTermSubjectGrade,
    (gradingReportChildTermSubjectGrade) =>
      gradingReportChildTermSubjectGrade.subject
  )
  gradingReportChildTermSubjectGrades: GradingReportChildTermSubjectGrade[];

  @OneToMany(
    () => GradingReportSubjects,
    (gradingReportSubjects) => gradingReportSubjects.reportSubject
  )
  gradingReportSubjects: GradingReportSubjects[];

  @OneToMany(
    () => GradingReportTermQuizzes,
    (gradingReportTermQuizzes) => gradingReportTermQuizzes.subject
  )
  gradingReportTermQuizzes: GradingReportTermQuizzes[];

  @OneToMany(
    () => ProvidedSubjectGroupLink,
    (providedSubjectGroupLink) => providedSubjectGroupLink.reportSubject
  )
  providedSubjectGroupLinks: ProvidedSubjectGroupLink[];

  @OneToMany(
    () => ProviderClassSubjects,
    (providerClassSubjects) => providerClassSubjects.reportSubject
  )
  providerClassSubjects: ProviderClassSubjects[];
}
