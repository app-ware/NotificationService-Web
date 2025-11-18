import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParentReadDataVideo } from "./ParentReadDataVideo";
import { StorageServer } from "./StorageServer";
import { PhotoAlbum } from "./PhotoAlbum";
import { VideoTag } from "./VideoTag";

@Index(
  "album_id-is_public-video_status-is_deleted",
  ["albumId", "isPublic", "videoStatus", "isDeleted"],
  {}
)
@Index(
  "is_public-video_status-INCLUDE-album_id-is_Deleted",
  ["albumId", "isDeleted", "isPublic", "videoStatus"],
  {}
)
@Index("PK_Video", ["videoId"], { unique: true })
@Entity("Video", { schema: "dbo" })
export class Video {
  @PrimaryGeneratedColumn({ type: "int", name: "video_id" })
  videoId: number;

  @Column("nvarchar", { name: "video_link", length: 250 })
  videoLink: string;

  @Column("nvarchar", { name: "video_thumbnail", nullable: true, length: 250 })
  videoThumbnail: string | null;

  @Column("date", { name: "video_date", nullable: true })
  videoDate: Date | null;

  @Column("int", { name: "album_id", nullable: true })
  albumId: number | null;

  @Column("nvarchar", { name: "video_tag", nullable: true })
  videoTag: string | null;

  @Column("bit", { name: "is_public", nullable: true, default: () => "(0)" })
  isPublic: boolean | null;

  @Column("int", { name: "video_status", nullable: true })
  videoStatus: number | null;

  @Column("nvarchar", {
    name: "uploaded_filename",
    nullable: true,
    length: 250,
  })
  uploadedFilename: string | null;

  @Column("bit", { name: "is_file_found", nullable: true })
  isFileFound: boolean | null;

  @Column("bit", { name: "is_file_moved", nullable: true })
  isFileMoved: boolean | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @Column("datetime", { name: "deletion_date", nullable: true })
  deletionDate: Date | null;

  @Column("datetime", {
    name: "last_update",
    nullable: true,
    default: () => "getutcdate()",
  })
  lastUpdate: Date | null;

  @Column("int", { name: "uploaded_by", nullable: true })
  uploadedBy: number | null;

  @Column("int", { name: "upload_user_type", nullable: true })
  uploadUserType: number | null;

  @Column("bit", {
    name: "is_available_for_download",
    nullable: true,
    default: () => "(1)",
  })
  isAvailableForDownload: boolean | null;

  @Column("datetime", { name: "file_status_update_time", nullable: true })
  fileStatusUpdateTime: Date | null;

  @Column("float", { name: "video_length", nullable: true, precision: 53 })
  videoLength: number | null;

  @Column("bit", {
    name: "deleted_by_admin",
    nullable: true,
    default: () => "(0)",
  })
  deletedByAdmin: boolean | null;

  @OneToMany(
    () => ParentReadDataVideo,
    (parentReadDataVideo) => parentReadDataVideo.video
  )
  parentReadDataVideos: ParentReadDataVideo[];

  @ManyToOne(() => StorageServer, (storageServer) => storageServer.videos, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "server_id", referencedColumnName: "serverId" }])
  server: StorageServer;

  @ManyToOne(() => PhotoAlbum, (photoAlbum) => photoAlbum.videos, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "album_id", referencedColumnName: "albumId" }])
  album: PhotoAlbum;

  @OneToMany(() => VideoTag, (videoTag) => videoTag.video)
  videoTags: VideoTag[];
}
