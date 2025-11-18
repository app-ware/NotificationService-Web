import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_App_Version", ["appVersionId"], { unique: true })
@Entity("App_Version", { schema: "dbo" })
export class AppVersion {
  @PrimaryGeneratedColumn({ type: "int", name: "app_version_id" })
  appVersionId: number;

  @Column("nvarchar", { name: "app_bundle", nullable: true, length: 250 })
  appBundle: string | null;

  @Column("int", { name: "device_type", nullable: true })
  deviceType: number | null;

  @Column("date", { name: "release_date", nullable: true })
  releaseDate: Date | null;

  @Column("bit", { name: "should_update", nullable: true })
  shouldUpdate: boolean | null;

  @Column("int", { name: "version_major", nullable: true })
  versionMajor: number | null;

  @Column("int", { name: "version_minor", nullable: true })
  versionMinor: number | null;

  @Column("int", { name: "version_revision", nullable: true })
  versionRevision: number | null;

  @Column("nvarchar", { name: "whats_new", nullable: true })
  whatsNew: string | null;

  @Column("nvarchar", {
    name: "minimum_os_version",
    nullable: true,
    length: 100,
  })
  minimumOsVersion: string | null;
}
