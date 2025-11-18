import { Column, Entity, Index } from "typeorm";

@Index(
  "PK__aspnet_S__5A1E6BC128A63447",
  ["feature", "compatibleSchemaVersion"],
  { unique: true }
)
@Entity("aspnet_SchemaVersions", { schema: "dbo" })
export class AspnetSchemaVersions {
  @Column("nvarchar", { primary: true, name: "Feature", length: 128 })
  feature: string;

  @Column("nvarchar", {
    primary: true,
    name: "CompatibleSchemaVersion",
    length: 128,
  })
  compatibleSchemaVersion: string;

  @Column("bit", { name: "IsCurrentVersion" })
  isCurrentVersion: boolean;
}
