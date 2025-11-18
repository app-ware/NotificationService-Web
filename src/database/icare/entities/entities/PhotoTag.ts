import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Photo } from "./Photo";

@Index("child_id", ["photoId", "childId"], {})
@Index("photo_id", ["photoId"], {})
@Index("PK_Photo_Tag", ["photoTagId"], { unique: true })
@Entity("Photo_Tag", { schema: "dbo" })
export class PhotoTag {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_tag_id" })
  photoTagId: number;

  @Column("int", { name: "photo_id", nullable: true })
  photoId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @ManyToOne(() => Photo, (photo) => photo.photoTags, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "photo_id", referencedColumnName: "photoId" }])
  photo: Photo;
}
