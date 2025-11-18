import { Column, Entity, Index, OneToMany } from "typeorm";
import { CenterParentAppFeatures } from "./CenterParentAppFeatures";
import { DefaultParentAppFeatures } from "./DefaultParentAppFeatures";

@Index("PK_Parent_App_Features", ["featureId"], { unique: true })
@Entity("Parent_App_Features", { schema: "dbo" })
export class ParentAppFeatures {
  @Column("int", { primary: true, name: "feature_id" })
  featureId: number;

  @Column("nvarchar", { name: "feature_title", nullable: true, length: 50 })
  featureTitle: string | null;

  @OneToMany(
    () => CenterParentAppFeatures,
    (centerParentAppFeatures) => centerParentAppFeatures.feature
  )
  centerParentAppFeatures: CenterParentAppFeatures[];

  @OneToMany(
    () => DefaultParentAppFeatures,
    (defaultParentAppFeatures) => defaultParentAppFeatures.feature
  )
  defaultParentAppFeatures: DefaultParentAppFeatures[];
}
