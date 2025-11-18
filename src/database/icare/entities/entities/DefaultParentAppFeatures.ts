import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParentAppFeatures } from "./ParentAppFeatures";

@Index("PK_Default_Parent_App_Features", ["defaultFeatureId"], { unique: true })
@Entity("Default_Parent_App_Features", { schema: "dbo" })
export class DefaultParentAppFeatures {
  @PrimaryGeneratedColumn({ type: "int", name: "default_feature_id" })
  defaultFeatureId: number;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

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
    () => ParentAppFeatures,
    (parentAppFeatures) => parentAppFeatures.defaultParentAppFeatures,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "feature_id", referencedColumnName: "featureId" }])
  feature: ParentAppFeatures;
}
