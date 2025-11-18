import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";

@Index("PK_Message_Attachments", ["messageAttachmentId"], { unique: true })
@Entity("Message_Attachments", { schema: "dbo" })
export class MessageAttachments {
  @PrimaryGeneratedColumn({ type: "int", name: "message_attachment_id" })
  messageAttachmentId: number;

  @Column("int", { name: "attachment_type", nullable: true })
  attachmentType: number | null;

  @Column("nvarchar", { name: "attachment_title", nullable: true, length: 500 })
  attachmentTitle: string | null;

  @Column("nvarchar", { name: "attachment_link", nullable: true, length: 250 })
  attachmentLink: string | null;

  @ManyToOne(() => Message, (message) => message.messageAttachments, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "message_id", referencedColumnName: "messageId" }])
  message: Message;
}
