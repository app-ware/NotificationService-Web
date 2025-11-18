import {Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {Class} from './Class'
import {CenterSharedLinks} from './CenterSharedLinks'


@Index("PK__Shared_L__7790383E925538AB",["sharedLinkClassId",],{ unique:true })
@Entity("Shared_Link_Classes" ,{schema:"dbo" } )
export  class SharedLinkClasses {

@PrimaryGeneratedColumn({ type:"int", name:"shared_link_class_id" })
sharedLinkClassId:number;

@ManyToOne(()=>Class,cls=>cls.sharedLinkClasses)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>CenterSharedLinks,centerSharedLinks=>centerSharedLinks.sharedLinkClasses)
@JoinColumn([{ name: "center_shared_link_id", referencedColumnName: "centerSharedLinkId" },
])

centerSharedLink:CenterSharedLinks;

}
