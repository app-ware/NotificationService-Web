import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {Provider} from './Provider'
import {Class} from './Class'


@Index("PK_Provider_Class",["providerClassId",],{ unique:true })
@Index("provider_id-class_id",["providerId","classId",],{  })
@Entity("Provider_Class" ,{schema:"dbo" } )
export  class ProviderClass {

@PrimaryGeneratedColumn({ type:"int", name:"provider_class_id" })
providerClassId:number;

@Column("int",{ name:"provider_id",nullable:true })
providerId:number | null;

@Column("int",{ name:"class_id",nullable:true })
classId:number | null;

@Column("int",{ name:"academic_year_id",nullable:true })
academicYearId:number | null;

@ManyToOne(()=>Provider,provider=>provider.providerClasses,{ onDelete:"CASCADE" })
@JoinColumn([{ name: "provider_id", referencedColumnName: "providerId" },
])

provider:Provider;

@ManyToOne(()=>Class,cls=>cls.providerClasses,{ onDelete:"CASCADE" })
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

}
