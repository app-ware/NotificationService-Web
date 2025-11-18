import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Centers_Status", ["id"], { unique: true })
@Entity("Center_Status", { schema: "dbo" })
export class CenterStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("int", { name: "activation_status", nullable: true })
  activationStatus: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;
}
