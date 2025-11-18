import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK__Center_G__06671B665D2C4C18", ["gradingReportSettingId"], {
  unique: true,
})
@Index("UQ__Center_G__290A288602E28B42", ["centerId"], { unique: true })
@Entity("Center_Grading_Report_Setting", { schema: "dbo" })
export class CenterGradingReportSetting {
  @PrimaryGeneratedColumn({ type: "int", name: "grading_report_setting_id" })
  gradingReportSettingId: number;

  @Column("int", { name: "center_id", unique: true })
  centerId: number;

  @Column("int", { name: "default_quizzes_max_grade", nullable: true })
  defaultQuizzesMaxGrade: number | null;

  @Column("bit", { name: "show_average_over_max_grade", nullable: true })
  showAverageOverMaxGrade: boolean | null;

  @Column("bit", { name: "show_average_over_editable_grade", nullable: true })
  showAverageOverEditableGrade: boolean | null;

  @Column("int", { name: "average_editable_grade", nullable: true })
  averageEditableGrade: number | null;

  @Column("bit", {
    name: "automatically_lock_headers_update",
    nullable: true,
    default: () => "(0)",
  })
  automaticallyLockHeadersUpdate: boolean | null;

  @Column("bit", { name: "quiz_default_publish_status", nullable: true })
  quizDefaultPublishStatus: boolean | null;

  @OneToOne(
    () => CareCenter,
    (careCenter) => careCenter.centerGradingReportSetting
  )
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
