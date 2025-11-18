import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";
import { MessageProviderMention } from "./MessageProviderMention";
import { ProviderClass } from "./ProviderClass";
import { ProviderClassSubjects } from "./ProviderClassSubjects";
import { ProviderDeviceRegistration } from "./ProviderDeviceRegistration";
import { ProviderNotes } from "./ProviderNotes";
import { ProviderNotificationDetail } from "./ProviderNotificationDetail";

@Index("PK_Provider", ["providerId"], { unique: true })
@Entity("Provider", { schema: "dbo" })
export class Provider {
  @PrimaryGeneratedColumn({ type: "int", name: "provider_id" })
  providerId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "provider_mobile", nullable: true })
  providerMobile: string | null;

  @Column("nvarchar", { name: "provider_photo", nullable: true })
  providerPhoto: string | null;

  @Column("int", { name: "provider_gender", nullable: true })
  providerGender: number | null;

  @Column("date", { name: "provider_dob", nullable: true })
  providerDob: Date | null;

  @Column("nvarchar", { name: "provider_degree", nullable: true })
  providerDegree: string | null;

  @Column("int", { name: "provider_role", nullable: true })
  providerRole: number | null;

  @Column("nvarchar", { name: "reg_code", nullable: true })
  regCode: string | null;

  @Column("nvarchar", { name: "provider_name", nullable: true })
  providerName: string | null;

  @Column("nvarchar", { name: "provider_capabilities", nullable: true })
  providerCapabilities: string | null;

  @Column("nvarchar", { name: "provider_name1", nullable: true })
  providerName1: string | null;

  @Column("nvarchar", { name: "provider_capabilities1", nullable: true })
  providerCapabilities1: string | null;

  @Column("nvarchar", { name: "provider_name2", nullable: true })
  providerName2: string | null;

  @Column("nvarchar", { name: "provider_capabilities2", nullable: true })
  providerCapabilities2: string | null;

  @Column("nvarchar", { name: "email", nullable: true })
  email: string | null;

  @Column("nvarchar", { name: "training", nullable: true })
  training: string | null;

  @Column("int", { name: "employee_id", nullable: true })
  employeeId: number | null;

  @Column("bit", { name: "deleted", nullable: true })
  deleted: boolean | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @OneToMany(() => Message, (message) => message.provider)
  messages: Message[];

  @OneToMany(
    () => MessageProviderMention,
    (messageProviderMention) => messageProviderMention.provider
  )
  messageProviderMentions: MessageProviderMention[];

  @OneToMany(() => ProviderClass, (providerClass) => providerClass.provider)
  providerClasses: ProviderClass[];

  @OneToMany(
    () => ProviderClassSubjects,
    (providerClassSubjects) => providerClassSubjects.provider
  )
  providerClassSubjects: ProviderClassSubjects[];

  @OneToMany(
    () => ProviderDeviceRegistration,
    (providerDeviceRegistration) => providerDeviceRegistration.provider
  )
  providerDeviceRegistrations: ProviderDeviceRegistration[];

  @OneToMany(() => ProviderNotes, (providerNotes) => providerNotes.provider)
  providerNotes: ProviderNotes[];

  @OneToMany(
    () => ProviderNotificationDetail,
    (providerNotificationDetail) => providerNotificationDetail.provider
  )
  providerNotificationDetails: ProviderNotificationDetail[];
}
