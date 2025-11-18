import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Watermark_Positions", { schema: "dbo" })
export class WatermarkPositions {
  @PrimaryGeneratedColumn({ name: "position_id" })
  positionId: number;

  @Column("nvarchar", { name: "position_name", nullable: true, length: 100 })
  positionName: string | null;
}
