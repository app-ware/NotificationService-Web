import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Dashboar__256E1E32A4551FF8", ["settingId"], { unique: true })
@Entity("Dashboard_Settings", { schema: "dbo" })
export class DashboardSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "setting_id" })
  settingId: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "expiry_employee_month_range", nullable: true })
  expiryEmployeeMonthRange: number | null;

  @Column("int", { name: "birthday_child_month_range", nullable: true })
  birthdayChildMonthRange: number | null;

  @Column("int", { name: "report_statistic_day_range", nullable: true })
  reportStatisticDayRange: number | null;

  @Column("int", { name: "arrival_departure_default_class", nullable: true })
  arrivalDepartureDefaultClass: number | null;

  @Column("int", { name: "parent_engagement_default_class", nullable: true })
  parentEngagementDefaultClass: number | null;

  @Column("int", { name: "employee_leave_month_range", nullable: true })
  employeeLeaveMonthRange: number | null;

  @Column("int", { name: "nurse_report_day_range", nullable: true })
  nurseReportDayRange: number | null;
}
