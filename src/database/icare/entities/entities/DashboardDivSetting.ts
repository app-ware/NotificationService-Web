import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Dashboar__74503EB632E8BF6F", ["dashboardSettingId"], {
  unique: true,
})
@Entity("Dashboard_Div_Setting", { schema: "dbo" })
export class DashboardDivSetting {
  @PrimaryGeneratedColumn({ type: "int", name: "dashboard_setting_id" })
  dashboardSettingId: number;

  @Column("nvarchar", { name: "dashboard_div_title", nullable: true })
  dashboardDivTitle: string | null;

  @Column("bit", {
    name: "dashboard_div_active",
    nullable: true,
    default: () => "(1)",
  })
  dashboardDivActive: boolean | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
