import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";

@Index("PK__Academic__D61213767F2F0141", ["childTermMentionId"], {
  unique: true,
})
@Entity("Academic_Report_Child_Term_Mention", { schema: "dbo" })
export class AcademicReportChildTermMention {
  @PrimaryGeneratedColumn({ type: "int", name: "child_term_mention_id" })
  childTermMentionId: number;

  @Column("int", { name: "academic_report_term_id" })
  academicReportTermId: number;

  @Column("int", { name: "academic_report_term_type" })
  academicReportTermType: number;

  @Column("float", { name: "child_term_merit", nullable: true, precision: 53 })
  childTermMerit: number | null;

  @Column("nvarchar", { name: "child_term_remark", nullable: true })
  childTermRemark: string | null;

  @ManyToOne(() => Child, (child) => child.academicReportChildTermMentions)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
