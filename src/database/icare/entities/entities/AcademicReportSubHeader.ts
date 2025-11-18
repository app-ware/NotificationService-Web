import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReportHeader } from "./AcademicReportHeader";

@Index("PK__Academic__5C673E1A51D88B55", ["academicReportSubHeaderId"], {
  unique: true,
})
@Entity("Academic_Report_Sub_Header", { schema: "dbo" })
export class AcademicReportSubHeader {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "academic_report_sub_header_id",
  })
  academicReportSubHeaderId: number;

  @Column("nvarchar", {
    name: "academic_report_sub_header_title",
    nullable: true,
  })
  academicReportSubHeaderTitle: string | null;

  @Column("nvarchar", {
    name: "academic_report_sub_header_description",
    nullable: true,
  })
  academicReportSubHeaderDescription: string | null;

  @Column("float", {
    name: "academic_report_sub_header_percent",
    nullable: true,
    precision: 53,
  })
  academicReportSubHeaderPercent: number | null;

  @Column("bit", { name: "is_final", nullable: true })
  isFinal: boolean | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;

  @ManyToOne(
    () => AcademicReportHeader,
    (academicReportHeader) => academicReportHeader.academicReportSubHeaders
  )
  @JoinColumn([
    {
      name: "academic_report_header_id",
      referencedColumnName: "academicReportHeaderId",
    },
  ])
  academicReportHeader: AcademicReportHeader;
}
