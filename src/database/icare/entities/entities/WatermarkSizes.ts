import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Watermark_Sizes", { schema: "dbo" })
export class WatermarkSizes {
  @PrimaryGeneratedColumn({ name: "size_id" })
  sizeId: number;

  @Column("nvarchar", { name: "size_name", nullable: true, length: 100 })
  sizeName: string | null;

  @Column("float", { name: "size_factor", nullable: true, precision: 53 })
  sizeFactor: number | null;
}
