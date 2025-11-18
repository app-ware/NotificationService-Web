import {Column,Entity,Index,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {AcademicYearQuizeGrade} from './AcademicYearQuizeGrade'
import {Class} from './Class'
import {CenterProvidedSubjects} from './CenterProvidedSubjects'
import {ParentReadDataQuizzes} from './ParentReadDataQuizzes'


@Index("PK__Academic__392A88918FD64351",["quizeId",],{ unique:true })
@Index("report_subject_id-academic_report_term_id-academic_report_term_type_id-class_id-INCLUDE-MULTIPLE",["quizeId","quizeTitle","quizeMaxGrade","quizePercent","quizeDate","reportSubjectId","academicReportTermId","academicReportTermTypeId","classId",],{  })
@Entity("Academic_Year_Quizes" ,{schema:"dbo" } )
export  class AcademicYearQuizes {

@PrimaryGeneratedColumn({ type:"int", name:"quize_id" })
quizeId:number;

@Column("nvarchar",{ name:"quize_title",nullable:true,length:200 })
quizeTitle:string | null;

@Column("float",{ name:"quize_max_grade",nullable:true,precision:53 })
quizeMaxGrade:number | null;

@Column("float",{ name:"quize_percent",nullable:true,precision:53 })
quizePercent:number | null;

@Column("int",{ name:"report_subject_id",nullable:true })
reportSubjectId:number | null;

@Column("int",{ name:"academic_report_term_id",nullable:true })
academicReportTermId:number | null;

@Column("int",{ name:"academic_report_term_type_id",nullable:true })
academicReportTermTypeId:number | null;

@Column("int",{ name:"class_id",nullable:true })
classId:number | null;

@Column("date",{ name:"quize_date",nullable:true })
quizeDate:Date | null;

@Column("bit",{ name:"is_published",nullable:true,default: () => "(1)", })
isPublished:boolean | null;

@OneToMany(()=>AcademicYearQuizeGrade,academicYearQuizeGrade=>academicYearQuizeGrade.quize)


academicYearQuizeGrades:AcademicYearQuizeGrade[];

@ManyToOne(()=>Class,cls=>cls.academicYearQuizes)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>CenterProvidedSubjects,centerProvidedSubjects=>centerProvidedSubjects.academicYearQuizes)
@JoinColumn([{ name: "report_subject_id", referencedColumnName: "reportSubjectId" },
])

reportSubject:CenterProvidedSubjects;

@OneToMany(()=>ParentReadDataQuizzes,parentReadDataQuizzes=>parentReadDataQuizzes.quiz)


parentReadDataQuizzes:ParentReadDataQuizzes[];

}
