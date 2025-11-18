import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CenterAlertMessage } from "./CenterAlertMessage";
import { CenterApiKeys } from "./CenterApiKeys";
import { CenterDailyLogVariants } from "./CenterDailyLogVariants";
import { CenterEventSettings } from "./CenterEventSettings";
import { CenterGradingReportSetting } from "./CenterGradingReportSetting";
import { CenterInvoicing } from "./CenterInvoicing";
import { CenterMediaSettings } from "./CenterMediaSettings";
import { CenterMenuScheduleFilling } from "./CenterMenuScheduleFilling";
import { CenterParentAppFeatures } from "./CenterParentAppFeatures";
import { CenterParentAppVariants } from "./CenterParentAppVariants";
import { CenterPolls } from "./CenterPolls";
import { CenterSharedLinks } from "./CenterSharedLinks";
import { CenterSmsLog } from "./CenterSmsLog";
import { CenterSmsSettings } from "./CenterSmsSettings";
import { ClassAgenda } from "./ClassAgenda";
import { CowpayCenterApiSettings } from "./CowpayCenterApiSettings";
import { EvaluationReport } from "./EvaluationReport";
import { FingerPrints } from "./FingerPrints";
import { GateArrivalRequest } from "./GateArrivalRequest";
import { GradingReport } from "./GradingReport";
import { InvoiceSettings } from "./InvoiceSettings";
import { ProviderNotificationHeader } from "./ProviderNotificationHeader";
import { SecUsers } from "./SecUsers";
import { SystemMenuSpecialPrivilege } from "./SystemMenuSpecialPrivilege";

@Index("center_id", ["centerId"], {})
@Index("PK_TBL_Care_Center", ["centerId"], { unique: true })
@Entity("Care_Center", { schema: "dbo" })
export class CareCenter {
  @PrimaryGeneratedColumn({ type: "int", name: "center_id" })
  centerId: number;

  @Column("nvarchar", { name: "center_email", nullable: true })
  centerEmail: string | null;

  @Column("nvarchar", { name: "center_land_line", nullable: true })
  centerLandLine: string | null;

  @Column("nvarchar", { name: "center_mobile", nullable: true })
  centerMobile: string | null;

  @Column("nvarchar", { name: "center_logo", nullable: true })
  centerLogo: string | null;

  @Column("nvarchar", { name: "center_photo", nullable: true })
  centerPhoto: string | null;

  @Column("nvarchar", { name: "center_theme_color", nullable: true })
  centerThemeColor: string | null;

  @Column("nvarchar", { name: "center_website", nullable: true, length: 250 })
  centerWebsite: string | null;

  @Column("nvarchar", { name: "center_name" })
  centerName: string;

  @Column("nvarchar", { name: "center_address", nullable: true })
  centerAddress: string | null;

  @Column("nvarchar", { name: "center_description", nullable: true })
  centerDescription: string | null;

  @Column("nvarchar", { name: "center_location", nullable: true })
  centerLocation: string | null;

  @Column("nvarchar", { name: "center_manager", nullable: true })
  centerManager: string | null;

  @Column("nvarchar", { name: "center_name1", nullable: true })
  centerName1: string | null;

  @Column("nvarchar", { name: "center_address1", nullable: true })
  centerAddress1: string | null;

  @Column("nvarchar", { name: "center_description1", nullable: true })
  centerDescription1: string | null;

  @Column("nvarchar", { name: "center_manager1", nullable: true })
  centerManager1: string | null;

  @Column("nvarchar", { name: "center_name2", nullable: true })
  centerName2: string | null;

  @Column("nvarchar", { name: "center_address2", nullable: true })
  centerAddress2: string | null;

  @Column("nvarchar", { name: "center_description2", nullable: true })
  centerDescription2: string | null;

  @Column("nvarchar", { name: "center_manager2", nullable: true })
  centerManager2: string | null;

  @Column("numeric", { name: "type", nullable: true, precision: 18, scale: 0 })
  type: number | null;

  @Column("int", { name: "center_currency", nullable: true })
  centerCurrency: number | null;

  @Column("int", {
    name: "expiry_employee_month_range",
    nullable: true,
    default: () => "(3)",
  })
  expiryEmployeeMonthRange: number | null;

  @Column("int", {
    name: "birthday_child_month_range",
    nullable: true,
    default: () => "(1)",
  })
  birthdayChildMonthRange: number | null;

  @Column("int", {
    name: "report_statistic_day_range",
    nullable: true,
    default: () => "(10)",
  })
  reportStatisticDayRange: number | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @Column("bit", { name: "is_demo", nullable: true, default: () => "(0)" })
  isDemo: boolean | null;

  @OneToOne(
    () => CenterAlertMessage,
    (centerAlertMessage) => centerAlertMessage.center
  )
  centerAlertMessage: CenterAlertMessage;

  @OneToMany(() => CenterApiKeys, (centerApiKeys) => centerApiKeys.center)
  centerApiKeys: CenterApiKeys[];

  @OneToMany(
    () => CenterDailyLogVariants,
    (centerDailyLogVariants) => centerDailyLogVariants.center
  )
  centerDailyLogVariants: CenterDailyLogVariants[];

  @OneToMany(
    () => CenterEventSettings,
    (centerEventSettings) => centerEventSettings.center
  )
  centerEventSettings: CenterEventSettings[];

  @OneToOne(
    () => CenterGradingReportSetting,
    (centerGradingReportSetting) => centerGradingReportSetting.center
  )
  centerGradingReportSetting: CenterGradingReportSetting;

  @OneToMany(() => CenterInvoicing, (centerInvoicing) => centerInvoicing.center)
  centerInvoicings: CenterInvoicing[];

  @OneToMany(
    () => CenterMediaSettings,
    (centerMediaSettings) => centerMediaSettings.center
  )
  centerMediaSettings: CenterMediaSettings[];

  @OneToOne(
    () => CenterMenuScheduleFilling,
    (centerMenuScheduleFilling) => centerMenuScheduleFilling.center
  )
  centerMenuScheduleFilling: CenterMenuScheduleFilling;

  @OneToMany(
    () => CenterParentAppFeatures,
    (centerParentAppFeatures) => centerParentAppFeatures.center
  )
  centerParentAppFeatures: CenterParentAppFeatures[];

  @OneToMany(
    () => CenterParentAppVariants,
    (centerParentAppVariants) => centerParentAppVariants.center
  )
  centerParentAppVariants: CenterParentAppVariants[];

  @OneToMany(() => CenterPolls, (centerPolls) => centerPolls.center)
  centerPolls: CenterPolls[];

  @OneToMany(
    () => CenterSharedLinks,
    (centerSharedLinks) => centerSharedLinks.center
  )
  centerSharedLinks: CenterSharedLinks[];

  @OneToMany(() => CenterSmsLog, (centerSmsLog) => centerSmsLog.center)
  centerSmsLogs: CenterSmsLog[];

  @OneToMany(
    () => CenterSmsSettings,
    (centerSmsSettings) => centerSmsSettings.center
  )
  centerSmsSettings: CenterSmsSettings[];

  @OneToMany(() => ClassAgenda, (classAgenda) => classAgenda.center)
  classAgenda: ClassAgenda[];

  @OneToMany(
    () => CowpayCenterApiSettings,
    (cowpayCenterApiSettings) => cowpayCenterApiSettings.center
  )
  cowpayCenterApiSettings: CowpayCenterApiSettings[];

  @OneToMany(
    () => EvaluationReport,
    (evaluationReport) => evaluationReport.center
  )
  evaluationReports: EvaluationReport[];

  @OneToMany(() => FingerPrints, (fingerPrints) => fingerPrints.center)
  fingerPrints: FingerPrints[];

  @OneToMany(
    () => GateArrivalRequest,
    (gateArrivalRequest) => gateArrivalRequest.center
  )
  gateArrivalRequests: GateArrivalRequest[];

  @OneToMany(() => GradingReport, (gradingReport) => gradingReport.center)
  gradingReports: GradingReport[];

  @OneToMany(() => InvoiceSettings, (invoiceSettings) => invoiceSettings.center)
  invoiceSettings: InvoiceSettings[];

  @OneToMany(
    () => ProviderNotificationHeader,
    (providerNotificationHeader) => providerNotificationHeader.center
  )
  providerNotificationHeaders: ProviderNotificationHeader[];

  @OneToMany(() => SecUsers, (secUsers) => secUsers.center)
  secUsers: SecUsers[];

  @OneToMany(
    () => SystemMenuSpecialPrivilege,
    (systemMenuSpecialPrivilege) => systemMenuSpecialPrivilege.center
  )
  systemMenuSpecialPrivileges: SystemMenuSpecialPrivilege[];
}
