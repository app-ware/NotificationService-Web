import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReportHeaderType } from "./AcademicReportHeaderType";

@Index("PK_Child_Grade_Report", ["childGradeReportId"], { unique: true })
@Entity("Child_Grade_Report", { schema: "dbo" })
export class ChildGradeReport {
  @PrimaryGeneratedColumn({ type: "int", name: "child_grade_report_id" })
  childGradeReportId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("int", { name: "academic_report_grade_id", nullable: true })
  academicReportGradeId: number | null;

  @Column("int", { name: "report_subject_id", nullable: true })
  reportSubjectId: number | null;

  @Column("float", { name: "report_grade", nullable: true, precision: 53 })
  reportGrade: number | null;

  @ManyToOne(
    () => AcademicReportHeaderType,
    (academicReportHeaderType) => academicReportHeaderType.childGradeReports
  )
  @JoinColumn([
    {
      name: "academic_report_header_type_id",
      referencedColumnName: "academicReportHeaderTypeId",
    },
  ])
  academicReportHeaderType: AcademicReportHeaderType;
}
