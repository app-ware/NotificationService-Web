import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("OSDevice_Auth", { schema: "dbo" })
export class OsDeviceAuth {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("nvarchar", { name: "OSKey", nullable: true, length: 255 })
  osKey: string | null;

  @Column("nvarchar", { name: "OSType", nullable: true, length: 255 })
  osType: string | null;

  @Column("nvarchar", { name: "OSPassKey", nullable: true, length: 255 })
  osPassKey: string | null;

  @Column("nvarchar", { name: "OSPassFile", nullable: true, length: 255 })
  osPassFile: string | null;
}
