import {Column,Entity,Index,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {GradingReportTermQuizGrade} from './GradingReportTermQuizGrade'
import {Class} from './Class'
import {GradingReportTerms} from './GradingReportTerms'
import {CenterProvidedSubjects} from './CenterProvidedSubjects'


@Index("PK__Grading___2D7053ECAE23ABEE",["quizId",],{ unique:true })
@Entity("Grading_Report_Term_Quizzes" ,{schema:"dbo" } )
export  class GradingReportTermQuizzes {

@PrimaryGeneratedColumn({ type:"int", name:"quiz_id" })
quizId:number;

@Column("nvarchar",{ name:"quiz_title",nullable:true,length:200 })
quizTitle:string | null;

@Column("float",{ name:"quiz_max_grade",nullable:true,precision:53 })
quizMaxGrade:number | null;

@Column("float",{ name:"quiz_percent",nullable:true,precision:53 })
quizPercent:number | null;

@Column("date",{ name:"quiz_date",nullable:true })
quizDate:Date | null;

@OneToMany(()=>GradingReportTermQuizGrade,gradingReportTermQuizGrade=>gradingReportTermQuizGrade.quiz)


gradingReportTermQuizGrades:GradingReportTermQuizGrade[];

@ManyToOne(()=>Class,cls=>cls.gradingReportTermQuizzes)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>GradingReportTerms,gradingReportTerms=>gradingReportTerms.gradingReportTermQuizzes)
@JoinColumn([{ name: "grading_report_term_id", referencedColumnName: "gradingReportTermId" },
])

gradingReportTerm:GradingReportTerms;

@ManyToOne(()=>CenterProvidedSubjects,centerProvidedSubjects=>centerProvidedSubjects.gradingReportTermQuizzes)
@JoinColumn([{ name: "subject_id", referencedColumnName: "reportSubjectId" },
])

subject:CenterProvidedSubjects;

}
