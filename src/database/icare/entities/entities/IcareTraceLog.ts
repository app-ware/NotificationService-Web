import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__icare_Tr__AAAC09D8C7170602", ["rowNumber"], { unique: true })
@Entity("icare_TraceLog", { schema: "dbo" })
export class IcareTraceLog {
  @PrimaryGeneratedColumn({ type: "int", name: "RowNumber" })
  rowNumber: number;

  @Column("int", { name: "EventClass", nullable: true })
  eventClass: number | null;

  @Column("ntext", { name: "TextData", nullable: true })
  textData: string | null;

  @Column("nvarchar", { name: "ApplicationName", nullable: true, length: 128 })
  applicationName: string | null;

  @Column("nvarchar", { name: "NTUserName", nullable: true, length: 128 })
  ntUserName: string | null;

  @Column("nvarchar", { name: "LoginName", nullable: true, length: 128 })
  loginName: string | null;

  @Column("int", { name: "CPU", nullable: true })
  cpu: number | null;

  @Column("bigint", { name: "Reads", nullable: true })
  reads: string | null;

  @Column("bigint", { name: "Writes", nullable: true })
  writes: string | null;

  @Column("bigint", { name: "Duration", nullable: true })
  duration: string | null;

  @Column("int", { name: "ClientProcessID", nullable: true })
  clientProcessId: number | null;

  @Column("int", { name: "SPID", nullable: true })
  spid: number | null;

  @Column("datetime", { name: "StartTime", nullable: true })
  startTime: Date | null;

  @Column("datetime", { name: "EndTime", nullable: true })
  endTime: Date | null;

  @Column("image", { name: "BinaryData", nullable: true })
  binaryData: Buffer | null;
}
