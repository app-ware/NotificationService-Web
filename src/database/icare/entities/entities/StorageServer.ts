import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Video } from "./Video";

@Index("PK_StorageServer", ["serverId"], { unique: true })
@Entity("Storage_Server", { schema: "dbo" })
export class StorageServer {
  @PrimaryGeneratedColumn({ type: "int", name: "server_id" })
  serverId: number;

  @Column("nvarchar", { name: "server_name", length: 250 })
  serverName: string;

  @Column("nvarchar", { name: "server_desc", nullable: true })
  serverDesc: string | null;

  @Column("nvarchar", { name: "server_url", length: 250 })
  serverUrl: string;

  @Column("bit", { name: "is_active", nullable: true })
  isActive: boolean | null;

  @Column("datetime", { name: "creation_date", default: () => "getutcdate()" })
  creationDate: Date;

  @OneToMany(() => Video, (video) => video.server)
  videos: Video[];
}
