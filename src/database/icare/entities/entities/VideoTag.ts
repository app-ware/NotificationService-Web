import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Video } from "./Video";
import { Child } from "./Child";

@Index("child_id", ["childId"], {})
@Index("PK_Video_Tag", ["id"], { unique: true })
@Entity("Video_Tag", { schema: "dbo" })
export class VideoTag {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @ManyToOne(() => Video, (video) => video.videoTags, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "video_id", referencedColumnName: "videoId" }])
  video: Video;

  @ManyToOne(() => Child, (child) => child.videoTags, { onDelete: "SET NULL" })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
