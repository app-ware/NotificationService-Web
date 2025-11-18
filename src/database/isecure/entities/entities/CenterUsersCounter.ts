import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Center_Users_Counter", ["id"], { unique: true })
@Entity("Center_Users_Counter", { schema: "dbo" })
export class CenterUsersCounter {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("int", { name: "user_counter", nullable: true })
  userCounter: number | null;

  @Column("int", { name: "user_type", nullable: true })
  userType: number | null;
}
