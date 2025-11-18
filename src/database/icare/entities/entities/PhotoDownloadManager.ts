import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Photo_Download_Manager", ["recordId"], { unique: true })
@Entity("Photo_Download_Manager", { schema: "dbo" })
export class PhotoDownloadManager {
  @PrimaryGeneratedColumn({ type: "int", name: "record_id" })
  recordId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "photo_link", nullable: true })
  photoLink: string | null;

  @Column("bit", {
    name: "is_downloaded",
    nullable: true,
    default: () => "(0)",
  })
  isDownloaded: boolean | null;

  @Column("int", { name: "photo_id", nullable: true })
  photoId: number | null;
}
