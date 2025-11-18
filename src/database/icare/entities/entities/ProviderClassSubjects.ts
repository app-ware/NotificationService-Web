import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {Provider} from './Provider'
import {Class} from './Class'
import {CenterProvidedSubjects} from './CenterProvidedSubjects'


@Index("PK__Provider__FCD2FEAB0D6BBD0E",["providerClassSubjectId",],{ unique:true })
@Entity("Provider_Class_Subjects" ,{schema:"dbo" } )
export  class ProviderClassSubjects {

@PrimaryGeneratedColumn({ type:"int", name:"provider_class_subject_id" })
providerClassSubjectId:number;

@Column("bit",{ name:"subject_delegation",nullable:true })
subjectDelegation:boolean | null;

@Column("int",{ name:"academic_year_id",nullable:true })
academicYearId:number | null;

@ManyToOne(()=>Provider,provider=>provider.providerClassSubjects)
@JoinColumn([{ name: "provider_id", referencedColumnName: "providerId" },
])

provider:Provider;

@ManyToOne(()=>Class,cls=>cls.providerClassSubjects)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>CenterProvidedSubjects,centerProvidedSubjects=>centerProvidedSubjects.providerClassSubjects)
@JoinColumn([{ name: "report_subject_id", referencedColumnName: "reportSubjectId" },
])

reportSubject:CenterProvidedSubjects;

}
