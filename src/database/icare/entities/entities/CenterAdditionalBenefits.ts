import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Center_A__B481E50865DDA0E0", ["benefitId"], { unique: true })
@Entity("Center_Additional_Benefits", { schema: "dbo" })
export class CenterAdditionalBenefits {
  @PrimaryGeneratedColumn({ type: "int", name: "benefit_id" })
  benefitId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "benefit_title", nullable: true })
  benefitTitle: string | null;
}
