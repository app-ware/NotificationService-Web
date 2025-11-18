import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Photo } from "./Photo";
import { Child } from "./Child";

@Index("child_id-photo_id", ["photoId", "childId"], { unique: true })
@Index("PK_Parent_Read_Data_Photo", ["id"], { unique: true })
@Entity("Parent_Read_Data_Photo", { schema: "dbo" })
export class ParentReadDataPhoto {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "photo_id", nullable: true })
  photoId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Photo, (photo) => photo.parentReadDataPhotos, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "photo_id", referencedColumnName: "photoId" }])
  photo: Photo;

  @ManyToOne(() => Child, (child) => child.parentReadDataPhotos, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
