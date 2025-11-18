import {Column,Entity,Index,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {ChildProviderNotes} from './ChildProviderNotes'
import {Provider} from './Provider'
import {Class} from './Class'


@Index("PK_Provider_Notes",["providerNoteId",],{ unique:true })
@Entity("Provider_Notes" ,{schema:"dbo" } )
export  class ProviderNotes {

@PrimaryGeneratedColumn({ type:"int", name:"provider_note_id" })
providerNoteId:number;

@Column("nvarchar",{ name:"note_text",nullable:true })
noteText:string | null;

@Column("date",{ name:"note_date",nullable:true })
noteDate:Date | null;

@Column("datetime",{ name:"creation_date",nullable:true })
creationDate:Date | null;

@Column("datetime",{ name:"update_date",nullable:true })
updateDate:Date | null;

@OneToMany(()=>ChildProviderNotes,childProviderNotes=>childProviderNotes.providerNote)


childProviderNotes:ChildProviderNotes[];

@ManyToOne(()=>Provider,provider=>provider.providerNotes,{ onDelete:"CASCADE" })
@JoinColumn([{ name: "provider_id", referencedColumnName: "providerId" },
])

provider:Provider;

@ManyToOne(()=>Class,cls=>cls.providerNotes,{ onDelete:"CASCADE" })
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

}
