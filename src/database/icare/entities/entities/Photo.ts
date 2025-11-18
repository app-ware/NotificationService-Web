import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParentReadDataPhoto } from "./ParentReadDataPhoto";
import { PhotoAlbum } from "./PhotoAlbum";
import { PhotoTag } from "./PhotoTag";

@Index("album_id", ["albumId"], {})
@Index(
  "album_id-photo_status-is_public-INCLUDE-MULTIPLE",
  [
    "photoId",
    "photoLink",
    "photoDate",
    "isDeleted",
    "photoTag",
    "lastUpdate",
    "albumId",
    "photoStatus",
    "isPublic",
  ],
  {}
)
@Index(
  "album_id-uploaded_filename-INCLUDE-photo_id",
  ["photoId", "albumId", "uploadedFilename"],
  {}
)
@Index(
  "photo_date_INCLUDE_album_id-is_deleted-photo_status",
  ["albumId", "isDeleted", "photoStatus", "photoDate"],
  {}
)
@Index(
  "photo_status- album_id - is_deleted",
  ["albumId", "isDeleted", "photoStatus"],
  {}
)
@Index("PK_Photo", ["photoId"], { unique: true })
@Entity("Photo", { schema: "dbo" })
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id" })
  photoId: number;

  @Column("nvarchar", { name: "photo_link", nullable: true })
  photoLink: string | null;

  @Column("date", { name: "photo_date", nullable: true })
  photoDate: Date | null;

  @Column("int", { name: "album_id", nullable: true })
  albumId: number | null;

  @Column("bit", { name: "is_submitted", nullable: true })
  isSubmitted: boolean | null;

  @Column("bit", { name: "is_aproved", nullable: true })
  isAproved: boolean | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;

  @Column("nvarchar", { name: "photo_tag", nullable: true })
  photoTag: string | null;

  @Column("nvarchar", { name: "photo_tag1", nullable: true })
  photoTag1: string | null;

  @Column("nvarchar", { name: "photo_tag2", nullable: true })
  photoTag2: string | null;

  @Column("int", { name: "photo_status", nullable: true })
  photoStatus: number | null;

  @Column("bit", { name: "is_public", nullable: true, default: () => "(0)" })
  isPublic: boolean | null;

  @Column("datetime", {
    name: "last_update",
    nullable: true,
    default: () => "getdate()",
  })
  lastUpdate: Date | null;

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

  @OneToMany(
    () => ParentReadDataPhoto,
    (parentReadDataPhoto) => parentReadDataPhoto.photo
  )
  parentReadDataPhotos: ParentReadDataPhoto[];

  @ManyToOne(() => PhotoAlbum, (photoAlbum) => photoAlbum.photos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "album_id", referencedColumnName: "albumId" }])
  album: PhotoAlbum;

  @OneToMany(() => PhotoTag, (photoTag) => photoTag.photo)
  photoTags: PhotoTag[];
}
