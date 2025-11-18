import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("att_date-INCLUDE-child_id", ["childId", "attDate"], {})
@Index("child_id - att_date", ["childId", "attDate"], { unique: true })
@Index("class_id", ["classId"], {})
@Index("PK__Child_At__3213E83FF3C89E41", ["id"], { unique: true })
@Entity("Child_Attendance", { schema: "dbo" })
export class ChildAttendance {
  // @PrimaryGeneratedColumn({
  //   type: "numeric",
  //   name: "id",
  //   precision: 18,
  //   scale: 0,
  // })
  // id: number;

  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number;


  @Column("numeric", {
    name: "child_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  childId: number | null;

  @Column("date", { name: "att_date", nullable: true })
  attDate: Date | null;

  @Column("numeric", {
    name: "class_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  classId: number | null;
}
