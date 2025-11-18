import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Center_R__B906A3BEC19EBA8B", ["reminderNoteId"], { unique: true })
@Entity("Center_Reminder_Notes", { schema: "dbo" })
export class CenterReminderNotes {
  @PrimaryGeneratedColumn({ type: "int", name: "reminder_note_id" })
  reminderNoteId: number;

  @Column("nvarchar", { name: "reminder_note_text", nullable: true })
  reminderNoteText: string | null;

  @Column("date", { name: "reminder_note_date", nullable: true })
  reminderNoteDate: Date | null;

  @Column("nvarchar", {
    name: "reminder_note_time",
    nullable: true,
    length: 50,
  })
  reminderNoteTime: string | null;

  @Column("bit", { name: "is_done", nullable: true, default: () => "(0)" })
  isDone: boolean | null;

  @Column("int", { name: "center_id", nullable: true })
  centerId: number | null;

  @Column("datetime", {
    name: "creation_date",
    nullable: true,
    default: () => "getdate()",
  })
  creationDate: Date | null;
}
