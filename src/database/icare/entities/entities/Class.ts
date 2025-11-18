import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReportClassSubjectInfo } from "./AcademicReportClassSubjectInfo";
import { AcademicReportClasses } from "./AcademicReportClasses";
import { AcademicYearQuizes } from "./AcademicYearQuizes";
import { ClassAgenda } from "./ClassAgenda";
import { ClassScheduleClassDateLink } from "./ClassScheduleClassDateLink";
import { ClassScheduleClasses } from "./ClassScheduleClasses";
import { EvaluationReportClasses } from "./EvaluationReportClasses";
import { FoodMenuClassDateLink } from "./FoodMenuClassDateLink";
import { FoodMenuClasses } from "./FoodMenuClasses";
import { GradingReportClasses } from "./GradingReportClasses";
import { GradingReportTermQuizzes } from "./GradingReportTermQuizzes";
import { ProviderClass } from "./ProviderClass";
import { ProviderClassSubjects } from "./ProviderClassSubjects";
import { ProviderNotes } from "./ProviderNotes";
import { SharedLinkClasses } from "./SharedLinkClasses";

@Index("class_id", ["centerId"], {})
@Index("PK_Class", ["classId"], { unique: true })
@Entity("Class", { schema: "dbo" })
export class Class {
  @PrimaryGeneratedColumn({ type: "int", name: "class_id" })
  classId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "class_theme", nullable: true })
  classTheme: string | null;

  @Column("nvarchar", { name: "class_logo", nullable: true })
  classLogo: string | null;

  @Column("nvarchar", { name: "class_section", nullable: true })
  classSection: string | null;

  @Column("nvarchar", {
    name: "class_ipcam",
    nullable: true,
    length: 250,
    default: () => "''",
  })
  classIpcam: string | null;

  @Column("nvarchar", { name: "class_name", nullable: true })
  className: string | null;

  @Column("nvarchar", { name: "class_description", nullable: true })
  classDescription: string | null;

  @Column("nvarchar", { name: "class_name1", nullable: true })
  className1: string | null;

  @Column("nvarchar", { name: "class_description1", nullable: true })
  classDescription1: string | null;

  @Column("nvarchar", { name: "class_name2", nullable: true })
  className2: string | null;

  @Column("nvarchar", { name: "class_description2", nullable: true })
  classDescription2: string | null;

  @Column("int", { name: "SYID", nullable: true })
  syid: number | null;

  @Column("int", { name: "class_category", nullable: true })
  classCategory: number | null;

  @Column("int", { name: "class_capacity", nullable: true })
  classCapacity: number | null;

  @Column("bit", { name: "deleted", nullable: true })
  deleted: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @OneToMany(
    () => AcademicReportClassSubjectInfo,
    (academicReportClassSubjectInfo) => academicReportClassSubjectInfo.class
  )
  academicReportClassSubjectInfos: AcademicReportClassSubjectInfo[];

  @OneToMany(
    () => AcademicReportClasses,
    (academicReportClasses) => academicReportClasses.class
  )
  academicReportClasses: AcademicReportClasses[];

  @OneToMany(
    () => AcademicYearQuizes,
    (academicYearQuizes) => academicYearQuizes.class
  )
  academicYearQuizes: AcademicYearQuizes[];

  @OneToMany(() => ClassAgenda, (classAgenda) => classAgenda.class)
  classAgenda: ClassAgenda[];

  @OneToMany(
    () => ClassScheduleClassDateLink,
    (classScheduleClassDateLink) => classScheduleClassDateLink.class
  )
  classScheduleClassDateLinks: ClassScheduleClassDateLink[];

  @OneToMany(
    () => ClassScheduleClasses,
    (classScheduleClasses) => classScheduleClasses.class
  )
  classScheduleClasses: ClassScheduleClasses[];

  @OneToMany(
    () => EvaluationReportClasses,
    (evaluationReportClasses) => evaluationReportClasses.class
  )
  evaluationReportClasses: EvaluationReportClasses[];

  @OneToMany(
    () => FoodMenuClassDateLink,
    (foodMenuClassDateLink) => foodMenuClassDateLink.class
  )
  foodMenuClassDateLinks: FoodMenuClassDateLink[];

  @OneToMany(() => FoodMenuClasses, (foodMenuClasses) => foodMenuClasses.class)
  foodMenuClasses: FoodMenuClasses[];

  @OneToMany(
    () => GradingReportClasses,
    (gradingReportClasses) => gradingReportClasses.class
  )
  gradingReportClasses: GradingReportClasses[];

  @OneToMany(
    () => GradingReportClasses,
    (gradingReportClasses) => gradingReportClasses.class_2
  )
  gradingReportClasses2: GradingReportClasses[];

  @OneToMany(
    () => GradingReportClasses,
    (gradingReportClasses) => gradingReportClasses.class_3
  )
  gradingReportClasses3: GradingReportClasses[];

  @OneToMany(
    () => GradingReportTermQuizzes,
    (gradingReportTermQuizzes) => gradingReportTermQuizzes.class
  )
  gradingReportTermQuizzes: GradingReportTermQuizzes[];

  @OneToMany(() => ProviderClass, (providerClass) => providerClass.class)
  providerClasses: ProviderClass[];

  @OneToMany(
    () => ProviderClassSubjects,
    (providerClassSubjects) => providerClassSubjects.class
  )
  providerClassSubjects: ProviderClassSubjects[];

  @OneToMany(() => ProviderNotes, (providerNotes) => providerNotes.class)
  providerNotes: ProviderNotes[];

  @OneToMany(
    () => SharedLinkClasses,
    (sharedLinkClasses) => sharedLinkClasses.class
  )
  sharedLinkClasses: SharedLinkClasses[];
}
