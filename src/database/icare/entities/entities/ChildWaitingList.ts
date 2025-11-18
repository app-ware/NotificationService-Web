import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Child_Waiting_List", ["waitingChildId"], { unique: true })
@Entity("Child_Waiting_List", { schema: "dbo" })
export class ChildWaitingList {
  @PrimaryGeneratedColumn({ type: "int", name: "waiting_child_id" })
  waitingChildId: number;

  @Column("nvarchar", { name: "child_name", nullable: true })
  childName: string | null;

  @Column("nvarchar", { name: "parent_id", nullable: true })
  parentId: string | null;

  @Column("date", { name: "child_dob", nullable: true })
  childDob: Date | null;

  @Column("nvarchar", { name: "child_special_needs", nullable: true })
  childSpecialNeeds: string | null;

  @Column("datetime", { name: "addition_date", nullable: true })
  additionDate: Date | null;

  @Column("int", { name: "suggested_class_id", nullable: true })
  suggestedClassId: number | null;

  @Column("int", { name: "child_status", nullable: true })
  childStatus: number | null;

  @Column("int", { name: "child_gender", nullable: true })
  childGender: number | null;

  @Column("nvarchar", { name: "child_pin", nullable: true })
  childPin: string | null;
}
