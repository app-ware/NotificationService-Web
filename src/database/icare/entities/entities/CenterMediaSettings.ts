import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK_Center_Media_Settings_1", ["id"], { unique: true })
@Entity("Center_Media_Settings", { schema: "dbo" })
export class CenterMediaSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "photos_per_day", nullable: true })
  photosPerDay: number | null;

  @Column("int", { name: "videos_per_day", nullable: true })
  videosPerDay: number | null;

  @Column("datetime", {
    name: "last_update",
    nullable: true,
    default: () => "getutcdate()",
  })
  lastUpdate: Date | null;

  @Column("int", { name: "videos_day_span", nullable: true })
  videosDaySpan: number | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.centerMediaSettings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
