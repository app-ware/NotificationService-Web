import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {Class} from './Class'
import {EvaluationReport} from './EvaluationReport'


@Index("PK__Evaluati__BD4728FD1CEE7039",["evaluationReportClassId",],{ unique:true })
@Index("UC_Class",["evaluationReportId","classId",],{ unique:true })
@Entity("Evaluation_Report_Classes" ,{schema:"dbo" } )
export  class EvaluationReportClasses {

@PrimaryGeneratedColumn({ type:"int", name:"evaluation_report_class_id" })
evaluationReportClassId:number;

@Column("int",{ name:"evaluation_report_id",unique:true })
evaluationReportId:number;

@Column("int",{ name:"class_id",nullable:true,unique:true })
classId:number | null;

@ManyToOne(()=>Class,cls=>cls.evaluationReportClasses)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>EvaluationReport,evaluationReport=>evaluationReport.evaluationReportClasses)
@JoinColumn([{ name: "evaluation_report_id", referencedColumnName: "evaluationReportId" },
])

evaluationReport:EvaluationReport;

}
