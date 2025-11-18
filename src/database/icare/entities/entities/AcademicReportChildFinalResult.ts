import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReport } from "./AcademicReport";
import { Child } from "./Child";

@Entity("Academic_Report_Child_Final_Result", { schema: "dbo" })
export class AcademicReportChildFinalResult {
  @PrimaryGeneratedColumn({ type: "int", name: "child_final_result_id" })
  childFinalResultId: number;

  @Column("float", { name: "child_final_grade", nullable: true, precision: 53 })
  childFinalGrade: number | null;

  @Column("nvarchar", { name: "child_final_remark", nullable: true })
  childFinalRemark: string | null;

  @Column("datetime", {
    name: "modification_date",
    nullable: true,
    default: () => "getdate()",
  })
  modificationDate: Date | null;

  @ManyToOne(
    () => AcademicReport,
    (academicReport) => academicReport.academicReportChildFinalResults
  )
  @JoinColumn([
    { name: "academic_report_id", referencedColumnName: "academicReportId" },
  ])
  academicReport: AcademicReport;

  @ManyToOne(() => Child, (child) => child.academicReportChildFinalResults)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
