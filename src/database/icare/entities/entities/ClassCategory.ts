import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("center_id", ["centerId"], {})
@Index("PK__Class_Ca__52714BF5C296F972", ["classCategoryId"], { unique: true })
@Entity("Class_Category", { schema: "dbo" })
export class ClassCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "class_category_id" })
  classCategoryId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "class_category_title", nullable: true })
  classCategoryTitle: string | null;

  @Column("nvarchar", { name: "class_category_description", nullable: true })
  classCategoryDescription: string | null;
}
