import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SecUsers } from "./SecUsers";

@Index("PK__sec_user__7141A82BDD857B57", ["userClassId"], { unique: true })
@Entity("sec_user_class", { schema: "dbo" })
export class SecUserClass {
  @PrimaryGeneratedColumn({ type: "int", name: "user_class_id" })
  userClassId: number;

  @Column("int", { name: "class_id" })
  classId: number;

  @ManyToOne(() => SecUsers, (secUsers) => secUsers.secUserClasses, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "UserID", referencedColumnName: "id" }])
  user: SecUsers;
}
