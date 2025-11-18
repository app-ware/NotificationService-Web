import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Center_D__91FA5431B9AFC424", ["deductionId"], { unique: true })
@Entity("Center_Deductions", { schema: "dbo" })
export class CenterDeductions {
  @PrimaryGeneratedColumn({ type: "int", name: "deduction_id" })
  deductionId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "deduction_title", nullable: true })
  deductionTitle: string | null;
}
