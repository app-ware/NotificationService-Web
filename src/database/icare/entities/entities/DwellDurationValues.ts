import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("DwellDuration_Values", { schema: "dbo" })
export class DwellDurationValues {
  @PrimaryGeneratedColumn({ type: "int", name: "dwell_duration_id" })
  dwellDurationId: number;

  @Column("int", { name: "duration_value", nullable: true })
  durationValue: number | null;

  @Column("nvarchar", { name: "duration_text", nullable: true })
  durationText: string | null;
}
