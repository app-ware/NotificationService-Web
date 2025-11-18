import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK_Center_Parent_App_Variants", ["centerAppVariantsId"], {
  unique: true,
})
@Entity("Center_Parent_App_Variants", { schema: "dbo" })
export class CenterParentAppVariants {
  @PrimaryGeneratedColumn({ type: "int", name: "center_app_variants_id" })
  centerAppVariantsId: number;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("nvarchar", { name: "center_variants_object", nullable: true })
  centerVariantsObject: string | null;

  @ManyToOne(
    () => CareCenter,
    (careCenter) => careCenter.centerParentAppVariants,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
