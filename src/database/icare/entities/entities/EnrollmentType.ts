import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Enrollme__561A548976DFBEFA", ["enrollmentTypeId"], { unique: true })
@Entity("Enrollment_Type", { schema: "dbo" })
export class EnrollmentType {
  @PrimaryGeneratedColumn({ type: "int", name: "enrollment_type_id" })
  enrollmentTypeId: number;

  @Column("int", { name: "class_category_id", nullable: true })
  classCategoryId: number | null;

  @Column("nvarchar", { name: "enrollment_title", nullable: true })
  enrollmentTitle: string | null;

  @Column("bit", { name: "is_full_day", nullable: true })
  isFullDay: boolean | null;

  @Column("float", { name: "hours_count", nullable: true, precision: 53 })
  hoursCount: number | null;
}
