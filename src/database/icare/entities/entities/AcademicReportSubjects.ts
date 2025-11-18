import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicReport } from "./AcademicReport";
import { CenterProvidedSubjects } from "./CenterProvidedSubjects";

@Index("PK__Academic__599E032CB5763D9F", ["academicReportSubjectsId"], {
  unique: true,
})
@Index("UNIQUE_Subject_Classes", ["reportSubjectId", "academicReportId"], {
  unique: true,
})
@Entity("Academic_Report_Subjects", { schema: "dbo" })
export class AcademicReportSubjects {
  @PrimaryGeneratedColumn({ type: "int", name: "academic_report_subjects_id" })
  academicReportSubjectsId: number;

  @Column("int", { name: "report_subject_id", nullable: true, unique: true })
  reportSubjectId: number | null;

  @Column("int", { name: "academic_report_id", nullable: true, unique: true })
  academicReportId: number | null;

  @Column("int", { name: "report_subject_order", nullable: true })
  reportSubjectOrder: number | null;

  @Column("float", { name: "subject_max_grade", nullable: true, precision: 53 })
  subjectMaxGrade: number | null;

  @Column("float", {
    name: "subject_pass_grade",
    nullable: true,
    precision: 53,
  })
  subjectPassGrade: number | null;

  @Column("float", { name: "subject_weight", nullable: true, precision: 53 })
  subjectWeight: number | null;

  @ManyToOne(
    () => AcademicReport,
    (academicReport) => academicReport.academicReportSubjects
  )
  @JoinColumn([
    { name: "academic_report_id", referencedColumnName: "academicReportId" },
  ])
  academicReport: AcademicReport;

  @ManyToOne(
    () => CenterProvidedSubjects,
    (centerProvidedSubjects) => centerProvidedSubjects.academicReportSubjects
  )
  @JoinColumn([
    { name: "report_subject_id", referencedColumnName: "reportSubjectId" },
  ])
  reportSubject: CenterProvidedSubjects;
}
