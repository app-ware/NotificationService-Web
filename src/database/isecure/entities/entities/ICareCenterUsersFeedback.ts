import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_iCare_Center_Users_Feedback", ["id"], { unique: true })
@Entity("iCare_Center_Users_Feedback", { schema: "dbo" })
export class ICareCenterUsersFeedback {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "center_user_id", nullable: true })
  centerUserId: number | null;

  @Column("int", { name: "center_type", nullable: true })
  centerType: number | null;

  @Column("int", { name: "recommendation_value", nullable: true })
  recommendationValue: number | null;

  @Column("nvarchar", { name: "comments", nullable: true })
  comments: string | null;

  @Column("datetime", {
    name: "last_update",
    nullable: true,
    default: () => "getutcdate()",
  })
  lastUpdate: Date | null;
}
