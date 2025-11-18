import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";
import { ParentAppFeatures } from "./ParentAppFeatures";

@Index("PK_Center_Parent_App_String", ["centerFeatureId"], { unique: true })
@Entity("Center_Parent_App_Features", { schema: "dbo" })
export class CenterParentAppFeatures {
  @PrimaryGeneratedColumn({ type: "int", name: "center_feature_id" })
  centerFeatureId: number;

  @Column("nvarchar", { name: "feature_title", nullable: true, length: 200 })
  featureTitle: string | null;

  @Column("nvarchar", { name: "feature_color", nullable: true, length: 100 })
  featureColor: string | null;

  @Column("nvarchar", { name: "feature_icon", nullable: true })
  featureIcon: string | null;

  @Column("int", { name: "feature_order", nullable: true })
  featureOrder: number | null;

  @Column("bit", { name: "is_visible", nullable: true })
  isVisible: boolean | null;

  @ManyToOne(
    () => CareCenter,
    (careCenter) => careCenter.centerParentAppFeatures,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;

  @ManyToOne(
    () => ParentAppFeatures,
    (parentAppFeatures) => parentAppFeatures.centerParentAppFeatures,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "feature_id", referencedColumnName: "featureId" }])
  feature: ParentAppFeatures;
}
