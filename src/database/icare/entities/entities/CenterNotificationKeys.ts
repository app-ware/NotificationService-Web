import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Center_Notification_Keys", { schema: "dbo" })
export class CenterNotificationKeys {
  @PrimaryGeneratedColumn({ type: "int", name: "UID" })
  uid: number;

  @Column("int", { name: "CenterType" })
  centerType: number;

  @Column("nvarchar", {
    name: "CenterDescription",
    nullable: true,
    length: 255,
  })
  centerDescription: string | null;

  @Column("nvarchar", { name: "AndroidKey", nullable: true, length: 50 })
  androidKey: string | null;

  @Column("nvarchar", { name: "pemFile", nullable: true, length: 50 })
  pemFile: string | null;

  @Column("nvarchar", { name: "pemPass", nullable: true, length: 50 })
  pemPass: string | null;
}
