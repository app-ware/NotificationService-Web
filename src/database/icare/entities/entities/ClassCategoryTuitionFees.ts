import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_ClassCategory_TuitionFees", ["classcategoryFeeId"], { unique: true })
@Entity("ClassCategory_TuitionFees", { schema: "dbo" })
export class ClassCategoryTuitionFees {
  @PrimaryGeneratedColumn({ type: "int", name: "classcategory_fee_id" })
  classcategoryFeeId: number;

  @Column("int", { name: "class_category_id", nullable: true })
  classCategoryId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "term_id", nullable: true })
  termId: number | null;

  @Column("int", { name: "academic_year", nullable: true })
  academicYear: number | null;

  @Column("int", { name: "enrollment_type_id", nullable: true })
  enrollmentTypeId: number | null;

  @Column("int", { name: "days_count" })
  daysCount: number;

  @Column("float", { name: "fee_amount", nullable: true, precision: 53 })
  feeAmount: number | null;
}
