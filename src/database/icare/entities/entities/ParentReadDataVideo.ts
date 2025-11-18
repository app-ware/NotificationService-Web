import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { Video } from "./Video";

@Index("PK_Parent_Read_Data_Video", ["id"], { unique: true })
@Entity("Parent_Read_Data_Video", { schema: "dbo" })
export class ParentReadDataVideo {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Child, (child) => child.parentReadDataVideos, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(() => Video, (video) => video.parentReadDataVideos, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "video_id", referencedColumnName: "videoId" }])
  video: Video;
}
