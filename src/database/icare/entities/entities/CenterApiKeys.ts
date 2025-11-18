import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareCenter } from "./CareCenter";

@Index("PK_Center_Api_Keys", ["id"], { unique: true })
@Entity("Center_Api_Keys", { schema: "dbo" })
export class CenterApiKeys {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "api_key", nullable: true })
  apiKey: string | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  creationDate: Date | null;

  @Column("datetime", {
    name: "modified_date",
    nullable: true,
    default: () => "getutcdate()",
  })
  modifiedDate: Date | null;

  @ManyToOne(() => CareCenter, (careCenter) => careCenter.centerApiKeys, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "center_id", referencedColumnName: "centerId" }])
  center: CareCenter;
}
