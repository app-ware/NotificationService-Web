import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Provider } from "./Provider";
import { MessageAttachments } from "./MessageAttachments";
import { MessageProviderMention } from "./MessageProviderMention";

@Index(
  "center_id-is_parent-is_read-INCLUDE_MULTIPLE",
  [
    "messageId",
    "messageSenderId",
    "isCenter",
    "messageDateTime",
    "isDelivered",
    "messageBody",
    "centerId",
    "isParent",
    "isRead",
  ],
  {}
)
@Index("message_sender_id", ["messageSenderId"], {})
@Index("PK_Message", ["messageId"], { unique: true })
@Entity("Message", { schema: "dbo" })
export class Message {
  @PrimaryGeneratedColumn({ type: "int", name: "message_id" })
  messageId: number;

  @Column("int", { name: "center_id" })
  centerId: number;

  @Column("nvarchar", {
    name: "message_sender_id",
    nullable: true,
    length: 250,
  })
  messageSenderId: string | null;

  @Column("bit", { name: "is_parent", nullable: true })
  isParent: boolean | null;

  @Column("bit", { name: "is_center", nullable: true })
  isCenter: boolean | null;

  @Column("datetime", { name: "message_date_time", nullable: true })
  messageDateTime: Date | null;

  @Column("bit", { name: "is_delivered", nullable: true })
  isDelivered: boolean | null;

  @Column("bit", { name: "is_read", nullable: true })
  isRead: boolean | null;

  @Column("nvarchar", { name: "message_body", nullable: true })
  messageBody: string | null;

  @Column("nvarchar", { name: "message_body1", nullable: true })
  messageBody1: string | null;

  @Column("nvarchar", { name: "message_body2", nullable: true })
  messageBody2: string | null;

  @Column("nvarchar", { name: "syid", nullable: true, length: 50 })
  syid: string | null;

  @ManyToOne(() => Provider, (provider) => provider.messages, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "provider_id", referencedColumnName: "providerId" }])
  provider: Provider;

  @OneToMany(
    () => MessageAttachments,
    (messageAttachments) => messageAttachments.message
  )
  messageAttachments: MessageAttachments[];

  @OneToMany(
    () => MessageProviderMention,
    (messageProviderMention) => messageProviderMention.message
  )
  messageProviderMentions: MessageProviderMention[];
}
