import { Column, Entity, Index } from "typeorm";

@Index("PK_Incident_Types_List", ["incidentTypeId"], { unique: true })
@Entity("Incident_Types_List", { schema: "dbo" })
export class IncidentTypesList {
  @Column("int", { primary: true, name: "incident_type_id" })
  incidentTypeId: number;

  @Column("nvarchar", { name: "incident_type_title", nullable: true })
  incidentTypeTitle: string | null;
}
