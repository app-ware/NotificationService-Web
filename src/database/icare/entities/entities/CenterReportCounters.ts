import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_ReportCounters", ["reportCounterId"], { unique: true })
@Entity("Center_ReportCounters", { schema: "dbo" })
export class CenterReportCounters {
  @PrimaryGeneratedColumn({ type: "int", name: "report_counter_id" })
  reportCounterId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "report_counter", nullable: true })
  reportCounter: number | null;

  @Column("int", { name: "report_counter_type", nullable: true })
  reportCounterType: number | null;
}
