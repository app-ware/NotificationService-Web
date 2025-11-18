import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChildReportTemperature } from "./ChildReportTemperature";
import { ReportChecklistItems } from "./ReportChecklistItems";
import { ReportNumberlistItems } from "./ReportNumberlistItems";

@Index("center_id- rdate", ["centerId", "rDate"], {})
@Index("child_id-rDate-UNIQUE", ["childId", "rDate"], { unique: true })
@Index("NonClusteredIndex-childid-rdate", ["childId", "rDate"], {})
@Index("PK__Child_Re__3214EC27B8B924EC", ["id"], { unique: true })
@Entity("Child_Report", { schema: "dbo" })
export class ChildReport {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("numeric", {
    name: "child_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  childId: number | null;

  @Column("numeric", {
    name: "center_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  centerId: number | null;

  @Column("date", { name: "rDate", nullable: true })
  rDate: Date | null;

  @Column("int", {
    name: "mood_morning",
    nullable: true,
    default: () => "(-1)",
  })
  moodMorning: number | null;

  @Column("int", { name: "mood_noon", nullable: true, default: () => "(-1)" })
  moodNoon: number | null;

  @Column("int", {
    name: "mood_afternoon",
    nullable: true,
    default: () => "(-1)",
  })
  moodAfternoon: number | null;

  @Column("int", { name: "breakfast", nullable: true, default: () => "(-1)" })
  breakfast: number | null;

  @Column("int", { name: "snack", nullable: true, default: () => "(-1)" })
  snack: number | null;

  @Column("int", { name: "lunch", nullable: true, default: () => "(-1)" })
  lunch: number | null;

  @Column("int", { name: "milk", nullable: true, default: () => "(-1)" })
  milk: number | null;

  @Column("int", { name: "water", nullable: true, default: () => "(-1)" })
  water: number | null;

  @Column("int", { name: "pee", nullable: true, default: () => "(0)" })
  pee: number | null;

  @Column("int", { name: "poop", nullable: true, default: () => "(0)" })
  poop: number | null;

  @Column("nvarchar", { name: "notes", nullable: true })
  notes: string | null;

  @Column("nvarchar", { name: "notes1", nullable: true })
  notes1: string | null;

  @Column("nvarchar", { name: "notes2", nullable: true })
  notes2: string | null;

  @Column("nvarchar", { name: "checklist1", nullable: true, length: 256 })
  checklist1: string | null;

  @Column("nvarchar", { name: "checklist2", nullable: true, length: 256 })
  checklist2: string | null;

  @Column("nvarchar", { name: "nrlist1", nullable: true, length: 256 })
  nrlist1: string | null;

  @Column("nvarchar", { name: "nrlist2", nullable: true, length: 256 })
  nrlist2: string | null;

  @Column("nvarchar", { name: "remarks", nullable: true })
  remarks: string | null;

  @Column("nvarchar", { name: "remarks1", nullable: true })
  remarks1: string | null;

  @Column("nvarchar", { name: "remarks2", nullable: true })
  remarks2: string | null;

  @Column("nvarchar", {
    name: "sleep",
    nullable: true,
    length: 50,
    default: () => "(0)",
  })
  sleep: string | null;

  @Column("datetime", { name: "LastSaved", nullable: true })
  lastSaved: Date | null;

  @Column("bit", { name: "is_approved", nullable: true, default: () => "(0)" })
  isApproved: boolean | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @Column("float", { name: "temperature", nullable: true, precision: 53 })
  temperature: number | null;

  @OneToMany(
    () => ChildReportTemperature,
    (childReportTemperature) => childReportTemperature.report
  )
  childReportTemperatures: ChildReportTemperature[];

  @OneToMany(
    () => ReportChecklistItems,
    (reportChecklistItems) => reportChecklistItems.report
  )
  reportChecklistItems: ReportChecklistItems[];

  @OneToMany(
    () => ReportNumberlistItems,
    (reportNumberlistItems) => reportNumberlistItems.report
  )
  reportNumberlistItems: ReportNumberlistItems[];
}
