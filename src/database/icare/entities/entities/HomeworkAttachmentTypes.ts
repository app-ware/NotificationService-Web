import { Column, Entity, Index } from "typeorm";

@Index("PK_Homework_Attachment_Types", ["attachmentTypeId"], { unique: true })
@Entity("Homework_Attachment_Types", { schema: "dbo" })
export class HomeworkAttachmentTypes {
  @Column("int", { primary: true, name: "attachment_type_id" })
  attachmentTypeId: number;

  @Column("nvarchar", { name: "attachment_type_title", nullable: true })
  attachmentTypeTitle: string | null;
}
