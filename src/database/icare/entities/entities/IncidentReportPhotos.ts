import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Incident_Report_Photos", ["incidentReportPhotoId"], { unique: true })
@Entity("Incident_Report_Photos", { schema: "dbo" })
export class IncidentReportPhotos {
  @PrimaryGeneratedColumn({ type: "int", name: "incident_report_photo_id" })
  incidentReportPhotoId: number;

  @Column("int", { name: "incident_report_id", nullable: true })
  incidentReportId: number | null;

  @Column("nvarchar", { name: "incident_photo_url", nullable: true })
  incidentPhotoUrl: string | null;
}
