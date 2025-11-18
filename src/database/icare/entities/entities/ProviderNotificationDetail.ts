import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Provider } from "./Provider";

@Index("PK__Provider__3214EC27D6F70E4D", ["id"], { unique: true })
@Entity("Provider_Notification_Detail", { schema: "dbo" })
export class ProviderNotificationDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "notification_id" })
  notificationId: number;

  @ManyToOne(() => Provider, (provider) => provider.providerNotificationDetails)
  @JoinColumn([{ name: "provider_id", referencedColumnName: "providerId" }])
  provider: Provider;
}
