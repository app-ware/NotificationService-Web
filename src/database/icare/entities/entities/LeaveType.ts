import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Leave_Type", ["leaveTypeId"], { unique: true })
@Entity("Leave_Type", { schema: "dbo" })
export class LeaveType {
  @PrimaryGeneratedColumn({ type: "int", name: "leave_type_id" })
  leaveTypeId: number;

  @Column("nvarchar", { name: "leave_type_title", nullable: true })
  leaveTypeTitle: string | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("bit", { name: "is_deleted", nullable: true })
  isDeleted: boolean | null;

  @Column("bit", { name: "is_paid", nullable: true, default: () => "(1)" })
  isPaid: boolean | null;
}
