import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Provider } from "./Provider";
import { Message } from "./Message";

@Index("PK_Message_Provider_Mention", ["id"], { unique: true })
@Entity("Message_Provider_Mention", { schema: "dbo" })
export class MessageProviderMention {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "mention_start_index", nullable: true })
  mentionStartIndex: number | null;

  @Column("int", { name: "mention_end_index", nullable: true })
  mentionEndIndex: number | null;

  @Column("nvarchar", { name: "mention_text", nullable: true, length: 200 })
  mentionText: string | null;

  @Column("bit", { name: "is_processed", nullable: true })
  isProcessed: boolean | null;

  @Column("bit", { name: "has_messaging_access", nullable: true })
  hasMessagingAccess: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Provider, (provider) => provider.messageProviderMentions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "provider_id", referencedColumnName: "providerId" }])
  provider: Provider;

  @ManyToOne(() => Message, (message) => message.messageProviderMentions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "message_id", referencedColumnName: "messageId" }])
  message: Message;
}
