import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {AcademicReport} from './AcademicReport'
import {Class} from './Class'
import {CenterProvidedSubjects} from './CenterProvidedSubjects'


@Index("PK__Academic__3B69DBF25824684E",["reportClassSubjectInfoId",],{ unique:true })
@Index("Unique_Academic_Report_Class_Subject",["academicReportId","classId","reportSubjectId",],{ unique:true })
@Entity("Academic_Report_Class_Subject_Info" ,{schema:"dbo" } )
export  class AcademicReportClassSubjectInfo {

@PrimaryGeneratedColumn({ type:"int", name:"report_class_subject_info_id" })
reportClassSubjectInfoId:number;

@Column("int",{ name:"academic_report_id",nullable:true,unique:true })
academicReportId:number | null;

@Column("int",{ name:"class_id",nullable:true,unique:true })
classId:number | null;

@Column("int",{ name:"report_subject_id",nullable:true,unique:true })
reportSubjectId:number | null;

@Column("float",{ name:"subject_max_grade",nullable:true,precision:53 })
subjectMaxGrade:number | null;

@Column("float",{ name:"subject_pass_grade",nullable:true,precision:53 })
subjectPassGrade:number | null;

@Column("float",{ name:"subject_weight",nullable:true,precision:53 })
subjectWeight:number | null;

@ManyToOne(()=>AcademicReport,academicReport=>academicReport.academicReportClassSubjectInfos)
@JoinColumn([{ name: "academic_report_id", referencedColumnName: "academicReportId" },
])

academicReport:AcademicReport;

@ManyToOne(()=>Class,cls=>cls.academicReportClassSubjectInfos)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>CenterProvidedSubjects,centerProvidedSubjects=>centerProvidedSubjects.academicReportClassSubjectInfos)
@JoinColumn([{ name: "report_subject_id", referencedColumnName: "reportSubjectId" },
])

reportSubject:CenterProvidedSubjects;

}
