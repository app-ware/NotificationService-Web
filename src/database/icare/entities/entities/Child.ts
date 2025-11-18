import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReportChildFinalResult } from "./AcademicReportChildFinalResult";
import { AcademicReportChildTermMention } from "./AcademicReportChildTermMention";
import { AcademicYearQuizeGrade } from "./AcademicYearQuizeGrade";
import { ChildDailyLog } from "./ChildDailyLog";
import { ChildPortalGeneratedKey } from "./ChildPortalGeneratedKey";
import { ChildProviderNotes } from "./ChildProviderNotes";
import { EvaluationReportChildFileLink } from "./EvaluationReportChildFileLink";
import { EvaluationReportChildTermItems } from "./EvaluationReportChildTermItems";
import { EvaluationReportChildTermRemarks } from "./EvaluationReportChildTermRemarks";
import { EventResponse } from "./EventResponse";
import { GateArrivalRequestChildMapping } from "./GateArrivalRequestChildMapping";
import { GradingReportChildTermMention } from "./GradingReportChildTermMention";
import { GradingReportChildTermSubjectGrade } from "./GradingReportChildTermSubjectGrade";
import { GradingReportTermQuizGrade } from "./GradingReportTermQuizGrade";
import { ParentReadDataDailyLog } from "./ParentReadDataDailyLog";
import { ParentReadDataEvaluation } from "./ParentReadDataEvaluation";
import { ParentReadDataEvent } from "./ParentReadDataEvent";
import { ParentReadDataHomework } from "./ParentReadDataHomework";
import { ParentReadDataInstallments } from "./ParentReadDataInstallments";
import { ParentReadDataMenu } from "./ParentReadDataMenu";
import { ParentReadDataNotification } from "./ParentReadDataNotification";
import { ParentReadDataPayment } from "./ParentReadDataPayment";
import { ParentReadDataPhoto } from "./ParentReadDataPhoto";
import { ParentReadDataQuizzes } from "./ParentReadDataQuizzes";
import { ParentReadDataReports } from "./ParentReadDataReports";
import { ParentReadDataSchedule } from "./ParentReadDataSchedule";
import { ParentReadDataVideo } from "./ParentReadDataVideo";
import { VideoTag } from "./VideoTag";

@Index("NonClusteredIndex-Child_ID", ["childId"], {})
@Index("parent_id", ["parentId"], {})
@Index("PK_Child", ["childId"], { unique: true })
@Entity("Child", { schema: "dbo" })
export class Child {
  @PrimaryGeneratedColumn({ type: "int", name: "child_id" })
  childId: number;

  @Column("nvarchar", { name: "parent_id", length: 250 })
  parentId: string;

  @Column("date", { name: "child_dob", nullable: true })
  childDob: Date | null;

  @Column("nvarchar", { name: "child_photo", nullable: true })
  childPhoto: string | null;

  @Column("bit", { name: "is_active", nullable: true })
  isActive: boolean | null;

  @Column("date", { name: "subscription_end", nullable: true })
  subscriptionEnd: Date | null;

  @Column("int", { name: "gender", nullable: true })
  gender: number | null;

  @Column("nvarchar", { name: "child_name", nullable: true })
  childName: string | null;

  @Column("nvarchar", { name: "special_needs", nullable: true })
  specialNeeds: string | null;

  @Column("nvarchar", { name: "child_name1", nullable: true })
  childName1: string | null;

  @Column("nvarchar", { name: "special_needs1", nullable: true })
  specialNeeds1: string | null;

  @Column("nvarchar", { name: "child_name2", nullable: true })
  childName2: string | null;

  @Column("nvarchar", { name: "special_needs2", nullable: true })
  specialNeeds2: string | null;

  @Column("date", { name: "registration_date", nullable: true })
  registrationDate: Date | null;

  @Column("bit", { name: "is_demo", nullable: true })
  isDemo: boolean | null;

  @Column("date", { name: "activation_date", nullable: true })
  activationDate: Date | null;

  @Column("bit", { name: "can_takephoto", nullable: true })
  canTakephoto: boolean | null;

  @Column("bit", { name: "deleted", nullable: true, default: () => "(0)" })
  deleted: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @Column("nvarchar", { name: "child_pin", nullable: true })
  childPin: string | null;

  @Column("nvarchar", { name: "nationality", nullable: true, length: 250 })
  nationality: string | null;

  @Column("nvarchar", { name: "nationality_id", nullable: true, length: 250 })
  nationalityId: string | null;

  @Column("nvarchar", { name: "registration_id", nullable: true, length: 250 })
  registrationId: string | null;

  @Column("nvarchar", { name: "place_of_birth", nullable: true, length: 250 })
  placeOfBirth: string | null;

  @Column("bit", { name: "is_archive", nullable: true, default: () => "(0)" })
  isArchive: boolean | null;

  @Column("nvarchar", { name: "child_notes", nullable: true })
  childNotes: string | null;

  @OneToMany(
    () => AcademicReportChildFinalResult,
    (academicReportChildFinalResult) => academicReportChildFinalResult.child
  )
  academicReportChildFinalResults: AcademicReportChildFinalResult[];

  @OneToMany(
    () => AcademicReportChildTermMention,
    (academicReportChildTermMention) => academicReportChildTermMention.child
  )
  academicReportChildTermMentions: AcademicReportChildTermMention[];

  @OneToMany(
    () => AcademicYearQuizeGrade,
    (academicYearQuizeGrade) => academicYearQuizeGrade.child
  )
  academicYearQuizeGrades: AcademicYearQuizeGrade[];

  @OneToMany(() => ChildDailyLog, (childDailyLog) => childDailyLog.child)
  childDailyLogs: ChildDailyLog[];

  @OneToOne(
    () => ChildPortalGeneratedKey,
    (childPortalGeneratedKey) => childPortalGeneratedKey.child
  )
  childPortalGeneratedKey: ChildPortalGeneratedKey;

  @OneToMany(
    () => ChildProviderNotes,
    (childProviderNotes) => childProviderNotes.child
  )
  childProviderNotes: ChildProviderNotes[];

  @OneToMany(
    () => EvaluationReportChildFileLink,
    (evaluationReportChildFileLink) => evaluationReportChildFileLink.child
  )
  evaluationReportChildFileLinks: EvaluationReportChildFileLink[];

  @OneToMany(
    () => EvaluationReportChildTermItems,
    (evaluationReportChildTermItems) => evaluationReportChildTermItems.child
  )
  evaluationReportChildTermItems: EvaluationReportChildTermItems[];

  @OneToMany(
    () => EvaluationReportChildTermRemarks,
    (evaluationReportChildTermRemarks) => evaluationReportChildTermRemarks.child
  )
  evaluationReportChildTermRemarks: EvaluationReportChildTermRemarks[];

  @OneToMany(() => EventResponse, (eventResponse) => eventResponse.child)
  eventResponses: EventResponse[];

  @OneToMany(
    () => GateArrivalRequestChildMapping,
    (gateArrivalRequestChildMapping) => gateArrivalRequestChildMapping.child
  )
  gateArrivalRequestChildMappings: GateArrivalRequestChildMapping[];

  @OneToMany(
    () => GradingReportChildTermMention,
    (gradingReportChildTermMention) => gradingReportChildTermMention.child
  )
  gradingReportChildTermMentions: GradingReportChildTermMention[];

  @OneToMany(
    () => GradingReportChildTermSubjectGrade,
    (gradingReportChildTermSubjectGrade) =>
      gradingReportChildTermSubjectGrade.child
  )
  gradingReportChildTermSubjectGrades: GradingReportChildTermSubjectGrade[];

  @OneToMany(
    () => GradingReportTermQuizGrade,
    (gradingReportTermQuizGrade) => gradingReportTermQuizGrade.child
  )
  gradingReportTermQuizGrades: GradingReportTermQuizGrade[];

  @OneToMany(
    () => ParentReadDataDailyLog,
    (parentReadDataDailyLog) => parentReadDataDailyLog.child
  )
  parentReadDataDailyLogs: ParentReadDataDailyLog[];

  @OneToMany(
    () => ParentReadDataEvaluation,
    (parentReadDataEvaluation) => parentReadDataEvaluation.child
  )
  parentReadDataEvaluations: ParentReadDataEvaluation[];

  @OneToMany(
    () => ParentReadDataEvent,
    (parentReadDataEvent) => parentReadDataEvent.child
  )
  parentReadDataEvents: ParentReadDataEvent[];

  @OneToMany(
    () => ParentReadDataHomework,
    (parentReadDataHomework) => parentReadDataHomework.child
  )
  parentReadDataHomeworks: ParentReadDataHomework[];

  @OneToMany(
    () => ParentReadDataInstallments,
    (parentReadDataInstallments) => parentReadDataInstallments.child
  )
  parentReadDataInstallments: ParentReadDataInstallments[];

  @OneToMany(
    () => ParentReadDataMenu,
    (parentReadDataMenu) => parentReadDataMenu.child
  )
  parentReadDataMenus: ParentReadDataMenu[];

  @OneToMany(
    () => ParentReadDataNotification,
    (parentReadDataNotification) => parentReadDataNotification.child
  )
  parentReadDataNotifications: ParentReadDataNotification[];

  @OneToMany(
    () => ParentReadDataPayment,
    (parentReadDataPayment) => parentReadDataPayment.child
  )
  parentReadDataPayments: ParentReadDataPayment[];

  @OneToMany(
    () => ParentReadDataPhoto,
    (parentReadDataPhoto) => parentReadDataPhoto.child
  )
  parentReadDataPhotos: ParentReadDataPhoto[];

  @OneToMany(
    () => ParentReadDataQuizzes,
    (parentReadDataQuizzes) => parentReadDataQuizzes.child
  )
  parentReadDataQuizzes: ParentReadDataQuizzes[];

  @OneToMany(
    () => ParentReadDataReports,
    (parentReadDataReports) => parentReadDataReports.child
  )
  parentReadDataReports: ParentReadDataReports[];

  @OneToMany(
    () => ParentReadDataSchedule,
    (parentReadDataSchedule) => parentReadDataSchedule.child
  )
  parentReadDataSchedules: ParentReadDataSchedule[];

  @OneToMany(
    () => ParentReadDataVideo,
    (parentReadDataVideo) => parentReadDataVideo.child
  )
  parentReadDataVideos: ParentReadDataVideo[];

  @OneToMany(() => VideoTag, (videoTag) => videoTag.child)
  videoTags: VideoTag[];
}
