import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReportHeaderType } from "./AcademicReportHeaderType";
import { AcademicReport } from "./AcademicReport";
import { AcademicReportSubHeader } from "./AcademicReportSubHeader";

@Index("PK__Academic__28FBF691BD1E1217", ["academicReportHeaderId"], {
  unique: true,
})
@Entity("Academic_Report_Header", { schema: "dbo" })
export class AcademicReportHeader {
  @PrimaryGeneratedColumn({ type: "int", name: "academic_report_header_id" })
  academicReportHeaderId: number;

  @Column("nvarchar", { name: "academic_report_header_title", nullable: true })
  academicReportHeaderTitle: string | null;

  @Column("nvarchar", {
    name: "academic_report_header_description",
    nullable: true,
  })
  academicReportHeaderDescription: string | null;

  @Column("float", {
    name: "academic_report_header_percent",
    nullable: true,
    precision: 53,
  })
  academicReportHeaderPercent: number | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;

  @Column("date", { name: "academic_report_header_date_from", nullable: true })
  academicReportHeaderDateFrom: Date | null;

  @Column("date", { name: "academic_report_header_date_to", nullable: true })
  academicReportHeaderDateTo: Date | null;

  @Column("bit", { name: "is_locked", nullable: true, default: () => "(0)" })
  isLocked: boolean | null;

  @ManyToOne(
    () => AcademicReportHeaderType,
    (academicReportHeaderType) => academicReportHeaderType.academicReportHeaders
  )
  @JoinColumn([
    {
      name: "academic_report_header_type_id",
      referencedColumnName: "academicReportHeaderTypeId",
    },
  ])
  academicReportHeaderType: AcademicReportHeaderType;

  @ManyToOne(
    () => AcademicReport,
    (academicReport) => academicReport.academicReportHeaders
  )
  @JoinColumn([
    { name: "academic_report_id", referencedColumnName: "academicReportId" },
  ])
  academicReport: AcademicReport;

  @OneToMany(
    () => AcademicReportSubHeader,
    (academicReportSubHeader) => academicReportSubHeader.academicReportHeader
  )
  academicReportSubHeaders: AcademicReportSubHeader[];
}
