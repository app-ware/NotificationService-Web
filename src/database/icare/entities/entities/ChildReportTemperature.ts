import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChildReport } from "./ChildReport";

@Index("PK_Child_Report_Temperature", ["id"], { unique: true })
@Index("report_id", ["reportId"], {})
@Entity("Child_Report_Temperature", { schema: "dbo" })
export class ChildReportTemperature {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "report_id", nullable: true })
  reportId: number | null;

  @Column("nvarchar", { name: "recorded_time", nullable: true, length: 50 })
  recordedTime: string | null;

  @Column("float", { name: "temperature_value", nullable: true, precision: 53 })
  temperatureValue: number | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @ManyToOne(
    () => ChildReport,
    (childReport) => childReport.childReportTemperatures,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "report_id", referencedColumnName: "id" }])
  report: ChildReport;
}
