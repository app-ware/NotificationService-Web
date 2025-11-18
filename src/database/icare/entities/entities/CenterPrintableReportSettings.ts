import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_Printable_Report_Settings_1", ["printableReportSettingsId"], {
  unique: true,
})
@Entity("Center_Printable_Report_Settings", { schema: "dbo" })
export class CenterPrintableReportSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "printable_report_settings_id" })
  printableReportSettingsId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "printable_report_type", nullable: true })
  printableReportType: number | null;

  @Column("nvarchar", { name: "header_image", nullable: true })
  headerImage: string | null;

  @Column("nvarchar", { name: "footer_image", nullable: true })
  footerImage: string | null;

  @Column("bit", { name: "use_images", nullable: true })
  useImages: boolean | null;

  @Column("bit", {
    name: "include_footer",
    nullable: true,
    default: () => "(1)",
  })
  includeFooter: boolean | null;

  @Column("int", { name: "date_format_id", default: () => "(1)" })
  dateFormatId: number;
}
