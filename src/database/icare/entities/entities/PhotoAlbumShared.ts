import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Photo_Album_Shared", { schema: "dbo" })
export class PhotoAlbumShared {
  @PrimaryGeneratedColumn({ type: "int", name: "album_id" })
  albumId: number;

  @Column("date", { name: "album_date", nullable: true })
  albumDate: Date | null;

  @Column("nvarchar", { name: "cover_photo", nullable: true })
  coverPhoto: string | null;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("nvarchar", { name: "album_name", nullable: true })
  albumName: string | null;

  @Column("nvarchar", { name: "album_description", nullable: true })
  albumDescription: string | null;

  @Column("nvarchar", { name: "album_name1", nullable: true })
  albumName1: string | null;

  @Column("nvarchar", { name: "album_description1", nullable: true })
  albumDescription1: string | null;

  @Column("nvarchar", { name: "album_name2", nullable: true })
  albumName2: string | null;

  @Column("nvarchar", { name: "album_description2", nullable: true })
  albumDescription2: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
