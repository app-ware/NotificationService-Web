import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";

@Index("PK_Parent_Read_Data_Payment", ["id"], { unique: true })
@Entity("Parent_Read_Data_Payment", { schema: "dbo" })
export class ParentReadDataPayment {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "payment_id", nullable: true })
  paymentId: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Child, (child) => child.parentReadDataPayments, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
