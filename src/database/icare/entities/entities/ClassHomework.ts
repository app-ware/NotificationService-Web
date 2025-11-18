import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParentReadDataHomework } from "./ParentReadDataHomework";

@Index(
  "class_id-INCLUDE_MULTIPLE",
  [
    "homeworkId",
    "providerId",
    "subjectId",
    "homeworkDate",
    "homeworkText",
    "homeworkExpectedTimeMinutes",
    "lastUpdate",
    "isDeleted",
    "isActive",
    "classId",
  ],
  {}
)
@Index("PK_Class_Homework", ["homeworkId"], { unique: true })
@Entity("Class_Homework", { schema: "dbo" })
export class ClassHomework {
  @PrimaryGeneratedColumn({ type: "int", name: "homework_id" })
  homeworkId: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("int", { name: "provider_id", nullable: true })
  providerId: number | null;

  @Column("int", { name: "subject_id", nullable: true })
  subjectId: number | null;

  @Column("date", { name: "homework_date", nullable: true })
  homeworkDate: Date | null;

  @Column("nvarchar", { name: "homework_text", nullable: true })
  homeworkText: string | null;

  @Column("int", {
    name: "homework_expected_time_minutes",
    nullable: true,
    default: () => "(0)",
  })
  homeworkExpectedTimeMinutes: number | null;

  @Column("datetime", {
    name: "last_update",
    nullable: true,
    default: () => "getutcdate()",
  })
  lastUpdate: Date | null;

  @Column("bit", { name: "is_deleted", nullable: true, default: () => "(0)" })
  isDeleted: boolean | null;

  @Column("int", {
    name: "homework_type",
    nullable: true,
    default: () => "(1)",
  })
  homeworkType: number | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "(1)" })
  isActive: boolean | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;

  @OneToMany(
    () => ParentReadDataHomework,
    (parentReadDataHomework) => parentReadDataHomework.homework
  )
  parentReadDataHomeworks: ParentReadDataHomework[];
}
