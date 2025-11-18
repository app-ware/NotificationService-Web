import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Photo_tag_bk", { schema: "dbo" })
export class PhotoTagBk {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_tag_id" })
  photoTagId: number;

  @Column("int", { name: "photo_id", nullable: true })
  photoId: number | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;
}
