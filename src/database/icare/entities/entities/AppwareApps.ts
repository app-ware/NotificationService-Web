import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Appware_Apps", ["appId"], { unique: true })
@Entity("Appware_Apps", { schema: "dbo" })
export class AppwareApps {
  @PrimaryGeneratedColumn({ type: "int", name: "app_id" })
  appId: number;

  @Column("nvarchar", { name: "app_bundle", nullable: true, length: 250 })
  appBundle: string | null;

  @Column("nvarchar", { name: "app_name", nullable: true, length: 250 })
  appName: string | null;

  @Column("bit", { name: "is_android", nullable: true })
  isAndroid: boolean | null;

  @Column("bit", { name: "is_iOS", nullable: true })
  isIOs: boolean | null;
}
