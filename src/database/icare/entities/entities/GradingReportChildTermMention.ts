import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { GradingReportTerms } from "./GradingReportTerms";

@Index("PK__Grading___D6121376EB49D0B6", ["childTermMentionId"], {
  unique: true,
})
@Entity("Grading_Report_Child_Term_Mention", { schema: "dbo" })
export class GradingReportChildTermMention {
  @PrimaryGeneratedColumn({ type: "int", name: "child_term_mention_id" })
  childTermMentionId: number;

  @Column("float", { name: "child_term_merit", nullable: true, precision: 53 })
  childTermMerit: number | null;

  @Column("nvarchar", { name: "child_term_remark", nullable: true })
  childTermRemark: string | null;

  @ManyToOne(() => Child, (child) => child.gradingReportChildTermMentions)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => GradingReportTerms,
    (gradingReportTerms) => gradingReportTerms.gradingReportChildTermMentions
  )
  @JoinColumn([
    {
      name: "grading_report_term_id",
      referencedColumnName: "gradingReportTermId",
    },
  ])
  gradingReportTerm: GradingReportTerms;
}
