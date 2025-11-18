import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GateArrivalRequest } from "./GateArrivalRequest";
import { ParentSmsLog } from "./ParentSmsLog";

@Index("NonClusteredIndex-parent_id", ["parentId"], {})
@Index("parent_centerId", ["centerId"], {})
@Index("PK_Parent_1", ["parentId"], { unique: true })
@Entity("Parent", { schema: "dbo" })
export class Parent {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { primary: true, name: "parent_id", length: 250 })
  parentId: string;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "primary_mobile", nullable: true })
  primaryMobile: string | null;

  @Column("nvarchar", { name: "primary_landline", nullable: true })
  primaryLandline: string | null;

  @Column("nvarchar", { name: "emergency_mobile", nullable: true })
  emergencyMobile: string | null;

  @Column("nvarchar", { name: "emergency_landline", nullable: true })
  emergencyLandline: string | null;

  @Column("nvarchar", { name: "parent_name", nullable: true })
  parentName: string | null;

  @Column("nvarchar", { name: "spouse_name", nullable: true })
  spouseName: string | null;

  @Column("nvarchar", { name: "primary_contact", nullable: true })
  primaryContact: string | null;

  @Column("nvarchar", { name: "emergency_contact", nullable: true })
  emergencyContact: string | null;

  @Column("nvarchar", { name: "primary_address", nullable: true })
  primaryAddress: string | null;

  @Column("nvarchar", { name: "parent_name1", nullable: true })
  parentName1: string | null;

  @Column("nvarchar", { name: "spouse_name1", nullable: true })
  spouseName1: string | null;

  @Column("nvarchar", { name: "primary_contact1", nullable: true })
  primaryContact1: string | null;

  @Column("nvarchar", { name: "emergency_contact1", nullable: true })
  emergencyContact1: string | null;

  @Column("nvarchar", { name: "primary_address1", nullable: true })
  primaryAddress1: string | null;

  @Column("nvarchar", { name: "parent_name2", nullable: true })
  parentName2: string | null;

  @Column("nvarchar", { name: "spouse_name2", nullable: true })
  spouseName2: string | null;

  @Column("nvarchar", { name: "primary_contact2", nullable: true })
  primaryContact2: string | null;

  @Column("nvarchar", { name: "emergency_contact2", nullable: true })
  emergencyContact2: string | null;

  @Column("nvarchar", { name: "primary_address2", nullable: true })
  primaryAddress2: string | null;

  @Column("nvarchar", { name: "email", nullable: true })
  email: string | null;

  @Column("int", { name: "parent_title", nullable: true })
  parentTitle: number | null;

  @Column("datetime", { name: "creationdate", nullable: true })
  creationdate: Date | null;

  @Column("bit", { name: "deleted", nullable: true, default: () => "(0)" })
  deleted: boolean | null;

  @Column("nvarchar", {
    name: "parent_profession",
    nullable: true,
    length: 250,
  })
  parentProfession: string | null;

  @Column("nvarchar", {
    name: "spouse_profession",
    nullable: true,
    length: 250,
  })
  spouseProfession: string | null;

  @Column("nvarchar", { name: "registration_id", nullable: true, length: 250 })
  registrationId: string | null;

  @Column("nvarchar", { name: "spouse_email", nullable: true, length: 100 })
  spouseEmail: string | null;

  @OneToMany(
    () => GateArrivalRequest,
    (gateArrivalRequest) => gateArrivalRequest.parent
  )
  gateArrivalRequests: GateArrivalRequest[];

  @OneToMany(() => ParentSmsLog, (parentSmsLog) => parentSmsLog.parent)
  parentSmsLogs: ParentSmsLog[];
}
