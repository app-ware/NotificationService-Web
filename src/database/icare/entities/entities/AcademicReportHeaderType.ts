import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReportHeader } from "./AcademicReportHeader";
import { ChildGradeReport } from "./ChildGradeReport";

@Index("PK__Academic__4B21C4AD144E05D1", ["academicReportHeaderTypeId"], {
  unique: true,
})
@Entity("Academic_Report_Header_Type", { schema: "dbo" })
export class AcademicReportHeaderType {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "academic_report_header_type_id",
  })
  academicReportHeaderTypeId: number;

  @Column("nvarchar", {
    name: "academic_report_header_type_title",
    nullable: true,
  })
  academicReportHeaderTypeTitle: string | null;

  @OneToMany(
    () => AcademicReportHeader,
    (academicReportHeader) => academicReportHeader.academicReportHeaderType
  )
  academicReportHeaders: AcademicReportHeader[];

  @OneToMany(
    () => ChildGradeReport,
    (childGradeReport) => childGradeReport.academicReportHeaderType
  )
  childGradeReports: ChildGradeReport[];
}
