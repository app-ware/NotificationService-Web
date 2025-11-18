import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("center_id", ["centerId"], { unique: true })
@Entity("Watermark_Properties", { schema: "dbo" })
export class WatermarkProperties {
  @PrimaryGeneratedColumn({ type: "int", name: "watermark_properties_id" })
  watermarkPropertiesId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "watermark_size", nullable: true })
  watermarkSize: number | null;

  @Column("int", { name: "watermark_position", nullable: true })
  watermarkPosition: number | null;
}
