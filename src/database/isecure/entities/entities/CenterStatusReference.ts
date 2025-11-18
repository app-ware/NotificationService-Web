import { Column, Entity, Index } from "typeorm";

@Index("PK_Center_Status_Reference", ["statusId"], { unique: true })
@Entity("Center_Status_Reference", { schema: "dbo" })
export class CenterStatusReference {
  @Column("int", { primary: true, name: "status_id" })
  statusId: number;

  @Column("nvarchar", { name: "status_title", nullable: true, length: 100 })
  statusTitle: string | null;
}
