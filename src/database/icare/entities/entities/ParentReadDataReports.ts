import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { ParentReports } from "./ParentReports";

@Index("child_id-report_id", ["reportId", "childId"], { unique: true })
@Index("PK_Parent_Read_Data_Reports", ["id"], { unique: true })
@Entity("Parent_Read_Data_Reports", { schema: "dbo" })
export class ParentReadDataReports {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "report_id", nullable: true })
  reportId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Child, (child) => child.parentReadDataReports, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => ParentReports,
    (parentReports) => parentReports.parentReadDataReports,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "report_id", referencedColumnName: "parentReportId" }])
  report: ParentReports;
}
