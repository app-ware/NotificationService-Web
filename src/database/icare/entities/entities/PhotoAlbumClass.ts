import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("album_id", ["albumId"], {})
@Index("class_id", ["classId"], {})
@Index("PK_Photo_Album_Class", ["albumClassId"], { unique: true })
@Entity("Photo_Album_Class", { schema: "dbo" })
export class PhotoAlbumClass {
  @PrimaryGeneratedColumn({ type: "int", name: "album_class_id" })
  albumClassId: number;

  @Column("int", { name: "album_id", nullable: true })
  albumId: number | null;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;
}
