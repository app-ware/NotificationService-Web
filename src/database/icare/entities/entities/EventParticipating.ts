import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Event_Participating", { schema: "dbo" })
export class EventParticipating {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "Participate_Code", nullable: true })
  participateCode: number | null;

  @Column("nvarchar", { name: "Participate_Name", nullable: true, length: 50 })
  participateName: string | null;

  @Column("nvarchar", { name: "Participate_Name1", nullable: true, length: 50 })
  participateName1: string | null;

  @Column("nvarchar", { name: "Participate_Name2", nullable: true, length: 50 })
  participateName2: string | null;
}
