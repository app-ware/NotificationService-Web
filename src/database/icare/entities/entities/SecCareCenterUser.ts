import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__secCareC__3214EC27F2EC384B", ["id"], { unique: true })
@Entity("secCareCenterUser", { schema: "dbo" })
export class SecCareCenterUser {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "UserID", nullable: true })
  userId: number | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;
}
