import { Column, Entity, Index } from "typeorm";

@Index("PK_User_Types", ["userTypeId"], { unique: true })
@Entity("User_Types", { schema: "dbo" })
export class UserTypes {
  @Column("int", { primary: true, name: "user_type_id" })
  userTypeId: number;

  @Column("nvarchar", { name: "user_type_title", nullable: true, length: 100 })
  userTypeTitle: string | null;
}
