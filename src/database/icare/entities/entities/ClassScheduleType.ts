import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__ClassSch__03234DB7A3BD2C09", ["classScheduleTypeId"], {
  unique: true,
})
@Entity("ClassSchedule_Type", { schema: "dbo" })
export class ClassScheduleType {
  @PrimaryGeneratedColumn({ type: "int", name: "class_schedule_type_id" })
  classScheduleTypeId: number;

  @Column("nvarchar", { name: "class_schedule_type_desc", nullable: true })
  classScheduleTypeDesc: string | null;
}
