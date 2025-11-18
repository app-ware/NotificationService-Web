import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";

@Index("PK_Parent_Read_Data_Installments", ["id"], { unique: true })
@Entity("Parent_Read_Data_Installments", { schema: "dbo" })
export class ParentReadDataInstallments {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "installment_id", nullable: true })
  installmentId: number | null;

  @Column("int", { name: "installment_type", nullable: true })
  installmentType: number | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "getutcdate()",
  })
  updateTime: Date | null;

  @ManyToOne(() => Child, (child) => child.parentReadDataInstallments, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;
}
