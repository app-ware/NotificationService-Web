import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParentReadDataReports } from "./ParentReadDataReports";

@Index("child_id", ["childId"], {})
@Index("child_id-report_date-UNIQUE", ["childId", "reportDate"], {
  unique: true,
})
@Index("PK_Parent_Reports_1", ["parentReportId"], { unique: true })
@Index("report_date", ["reportDate"], {})
@Index(
  "report_date_INCLUDE_parent_report_id-child_id",
  ["parentReportId", "childId", "reportDate"],
  {}
)
@Entity("Parent_Reports", { schema: "dbo" })
export class ParentReports {
  @PrimaryGeneratedColumn({ type: "int", name: "parent_report_id" })
  parentReportId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("date", { name: "report_date", nullable: true })
  reportDate: Date | null;

  @Column("nvarchar", { name: "report_JSON", nullable: true })
  reportJson: string | null;

  @Column("bit", { name: "is_read", nullable: true, default: () => "(0)" })
  isRead: boolean | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @OneToMany(
    () => ParentReadDataReports,
    (parentReadDataReports) => parentReadDataReports.report
  )
  parentReadDataReports: ParentReadDataReports[];
}
