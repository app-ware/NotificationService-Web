import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Child } from "./Child";
import { ProviderNotes } from "./ProviderNotes";

@Index("PK_Child_Provider_Notes", ["childProviderNoteId"], { unique: true })
@Entity("Child_Provider_Notes", { schema: "dbo" })
export class ChildProviderNotes {
  @PrimaryGeneratedColumn({ type: "int", name: "child_provider_note_id" })
  childProviderNoteId: number;

  @ManyToOne(() => Child, (child) => child.childProviderNotes, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "child_id", referencedColumnName: "childId" }])
  child: Child;

  @ManyToOne(
    () => ProviderNotes,
    (providerNotes) => providerNotes.childProviderNotes,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "provider_note_id", referencedColumnName: "providerNoteId" },
  ])
  providerNote: ProviderNotes;
}
