import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {GradingReport} from './GradingReport'
import {Class} from './Class'


@Index("Grading_Report_UC_Class",["gradingReportId","classId",],{ unique:true })
@Index("PK__Grading___5346E43C018D4508",["gradingReportClassId",],{ unique:true })
@Entity("Grading_Report_Classes" ,{schema:"dbo" } )
export  class GradingReportClasses {

@PrimaryGeneratedColumn({ type:"int", name:"grading_report_class_id" })
gradingReportClassId:number;

@Column("int",{ name:"grading_report_id",unique:true })
gradingReportId:number;

@Column("int",{ name:"class_id",nullable:true,unique:true })
classId:number | null;

@ManyToOne(()=>GradingReport,gradingReport=>gradingReport.gradingReportClasses)
@JoinColumn([{ name: "grading_report_id", referencedColumnName: "gradingReportId" },
])

gradingReport:GradingReport;

@ManyToOne(()=>Class,cls=>cls.gradingReportClasses)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>Class,cls=>cls.gradingReportClasses2)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class_2:Class;

@ManyToOne(()=>Class,cls=>cls.gradingReportClasses3)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class_3:Class;

}
