import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__ClassCat__B21A2BC4F94A49C4", ["classcategoryFeeId"], {
  unique: true,
})
@Entity("ClassCategory_AdditionalFees", { schema: "dbo" })
export class ClassCategoryAdditionalFees {
  @PrimaryGeneratedColumn({ type: "int", name: "classcategory_fee_id" })
  classcategoryFeeId: number;

  @Column("int", { name: "class_category_id", nullable: true })
  classCategoryId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "term_id", nullable: true })
  termId: number | null;

  @Column("nvarchar", { name: "academic_year", nullable: true })
  academicYear: string | null;

  @Column("nvarchar", { name: "fee_title", nullable: true })
  feeTitle: string | null;

  @Column("float", { name: "fee_amount", nullable: true, precision: 53 })
  feeAmount: number | null;
}
