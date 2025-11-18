import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Child_Accident_Report", ["incidentReportId"], { unique: true })
@Entity("Child_Incident_Report", { schema: "dbo" })
export class ChildIncidentReport {
  @PrimaryGeneratedColumn({ type: "int", name: "incident_report_id" })
  incidentReportId: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("date", { name: "incident_date", nullable: true })
  incidentDate: Date | null;

  @Column("time", { name: "incident_time", nullable: true })
  incidentTime: Date | null;

  @Column("nvarchar", { name: "incident_title", nullable: true })
  incidentTitle: string | null;

  @Column("nvarchar", { name: "incident_description", nullable: true })
  incidentDescription: string | null;

  @Column("nvarchar", { name: "incident_actions_taken", nullable: true })
  incidentActionsTaken: string | null;

  @Column("nvarchar", {
    name: "incident_medications_prescribed",
    nullable: true,
  })
  incidentMedicationsPrescribed: string | null;

  @Column("int", { name: "incident_report_person_id", nullable: true })
  incidentReportPersonId: number | null;

  @Column("bit", { name: "parent_contacted", nullable: true })
  parentContacted: boolean | null;

  @Column("time", { name: "parent_contact_time", nullable: true })
  parentContactTime: Date | null;
}
