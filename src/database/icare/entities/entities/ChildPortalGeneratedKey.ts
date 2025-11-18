import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";

@Index("PK__Child_Po__2ADE87628C9AA23B", ["childPortalKeyId"], { unique: true })
@Index("UQ__Child_Po__015ADC04D00B46A0", ["childId"], { unique: true })
@Index("UQ__Child_Po__FEEE6567C8A6A8C3", ["generatedKey"], { unique: true })
@Entity("Child_Portal_Generated_Key", { schema: "dbo" })
export class ChildPortalGeneratedKey {
  @PrimaryGeneratedColumn({ type: "int", name: "child_portal_key_id" })
  childPortalKeyId: number;

  @Column("int", { name: "child_id", unique: true })
  childId: number;

  @Column("varchar", { name: "generated_key", unique: true, length: 45 })
  generatedKey: string;

  @Column("datetime", {
    name: "last_modified",
    nullable: true,
    default: () => "getdate()",
  })
  lastModified: Date | null;

  @OneToOne(() => Child, (child) => child.childPortalGeneratedKey)
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
