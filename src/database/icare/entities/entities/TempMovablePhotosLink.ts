import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("batch_number", ["batchNumber"], {})
@Index("center_id", ["centerId"], {})
@Index("photo_id", ["photoId"], { unique: true })
@Index("PK_Temp_Photos_Link", ["photoCounter"], { unique: true })
@Entity("Temp_Movable_Photos_Link", { schema: "dbo" })
export class TempMovablePhotosLink {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_counter" })
  photoCounter: number;

  @Column("int", { name: "photo_id", nullable: true })
  photoId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "album_id", nullable: true })
  albumId: number | null;

  @Column("nvarchar", { name: "photo_link", nullable: true, length: 200 })
  photoLink: string | null;

  @Column("date", { name: "photo_date", nullable: true })
  photoDate: Date | null;

  @Column("int", { name: "photo_status", nullable: true })
  photoStatus: number | null;

  @Column("bit", { name: "is_processed", nullable: true })
  isProcessed: boolean | null;

  @Column("int", { name: "batch_number", nullable: true })
  batchNumber: number | null;
}
