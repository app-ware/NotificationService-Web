import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK_Center_Event_Settings", ["id"], { unique: true })
@Entity("Center_Event_Settings", { schema: "dbo" })
export class CenterEventSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("bit", { name: "show_special_needs", nullable: true })
  showSpecialNeeds: boolean | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.centerEventSettings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
