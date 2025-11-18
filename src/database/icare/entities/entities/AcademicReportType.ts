import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Academic__06590075E35D0CC8", ["academicReportTypeId"], {
  unique: true,
})
@Entity("Academic_Report_Type", { schema: "dbo" })
export class AcademicReportType {
  @PrimaryGeneratedColumn({ type: "int", name: "academic_report_type_id" })
  academicReportTypeId: number;

  @Column("nvarchar", { name: "academic_report_type_name", nullable: true })
  academicReportTypeName: string | null;
}
