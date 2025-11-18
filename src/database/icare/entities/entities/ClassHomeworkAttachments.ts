import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Homework_Attachments", ["homeworkAttachmentId"], { unique: true })
@Entity("Class_Homework_Attachments", { schema: "dbo" })
export class ClassHomeworkAttachments {
  @PrimaryGeneratedColumn({ type: "int", name: "homework_attachment_id" })
  homeworkAttachmentId: number;

  @Column("int", { name: "homework_id", nullable: true })
  homeworkId: number | null;

  @Column("nvarchar", { name: "attachment_link", nullable: true })
  attachmentLink: string | null;

  @Column("int", { name: "attachment_type", nullable: true })
  attachmentType: number | null;

  @Column("bit", { name: "deleted", nullable: true, default: () => "(0)" })
  deleted: boolean | null;

  @Column("nvarchar", { name: "attachment_title", nullable: true })
  attachmentTitle: string | null;
}
