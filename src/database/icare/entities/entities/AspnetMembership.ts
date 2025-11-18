import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { AspnetApplications } from "./AspnetApplications";
import { AspnetUsers } from "./AspnetUsers";

@Index("aspnet_Membership_index", ["applicationId", "loweredEmail"], {})
@Index("PK__aspnet_M__1788CC4D6F015AAD", ["userId"], { unique: true })
@Entity("aspnet_Membership", { schema: "dbo" })
export class AspnetMembership {
  @Column("uniqueidentifier", { name: "ApplicationId" })
  applicationId: string;

  @Column("uniqueidentifier", { primary: true, name: "UserId" })
  userId: string;

  @Column("nvarchar", { name: "Password", length: 128 })
  password: string;

  @Column("int", { name: "PasswordFormat", default: () => "(0)" })
  passwordFormat: number;

  @Column("nvarchar", { name: "PasswordSalt", length: 128 })
  passwordSalt: string;

  @Column("nvarchar", { name: "MobilePIN", nullable: true, length: 16 })
  mobilePin: string | null;

  @Column("nvarchar", { name: "Email", nullable: true, length: 256 })
  email: string | null;

  @Column("nvarchar", { name: "LoweredEmail", nullable: true, length: 256 })
  loweredEmail: string | null;

  @Column("nvarchar", { name: "PasswordQuestion", nullable: true, length: 256 })
  passwordQuestion: string | null;

  @Column("nvarchar", { name: "PasswordAnswer", nullable: true, length: 128 })
  passwordAnswer: string | null;

  @Column("bit", { name: "IsApproved" })
  isApproved: boolean;

  @Column("bit", { name: "IsLockedOut" })
  isLockedOut: boolean;

  @Column("datetime", { name: "CreateDate" })
  createDate: Date;

  @Column("datetime", { name: "LastLoginDate" })
  lastLoginDate: Date;

  @Column("datetime", { name: "LastPasswordChangedDate" })
  lastPasswordChangedDate: Date;

  @Column("datetime", { name: "LastLockoutDate" })
  lastLockoutDate: Date;

  @Column("int", { name: "FailedPasswordAttemptCount" })
  failedPasswordAttemptCount: number;

  @Column("datetime", { name: "FailedPasswordAttemptWindowStart" })
  failedPasswordAttemptWindowStart: Date;

  @Column("int", { name: "FailedPasswordAnswerAttemptCount" })
  failedPasswordAnswerAttemptCount: number;

  @Column("datetime", { name: "FailedPasswordAnswerAttemptWindowStart" })
  failedPasswordAnswerAttemptWindowStart: Date;

  @Column("ntext", { name: "Comment", nullable: true })
  comment: string | null;

  @ManyToOne(
    () => AspnetApplications,
    (aspnetApplications) => aspnetApplications.aspnetMemberships
  )
  @JoinColumn([
    { name: "ApplicationId", referencedColumnName: "applicationId" },
  ])
  application: AspnetApplications;

  @OneToOne(() => AspnetUsers, (aspnetUsers) => aspnetUsers.aspnetMembership)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: AspnetUsers;
}
