import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Photos_DownloadLog", { schema: "dbo" })
export class PhotosDownloadLog {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("date", { name: "fromDate", nullable: true })
  fromDate: Date | null;

  @Column("date", { name: "toDate", nullable: true })
  toDate: Date | null;

  @Column("datetime", { name: "download_time", nullable: true })
  downloadTime: Date | null;

  @Column("int", { name: "child_id", nullable: true })
  childId: number | null;
}
