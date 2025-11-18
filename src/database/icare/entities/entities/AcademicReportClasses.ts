import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {AcademicReport} from './AcademicReport'
import {Class} from './Class'


@Index("PK__Academic__9EA94B66004A18BD",["academicReportClassesId",],{ unique:true })
@Index("UNIQUE_Term_Classes",["academicReportId","classId",],{ unique:true })
@Entity("Academic_Report_Classes" ,{schema:"dbo" } )
export  class AcademicReportClasses {

@PrimaryGeneratedColumn({ type:"int", name:"academic_report_classes_id" })
academicReportClassesId:number;

@Column("int",{ name:"academic_report_id",nullable:true,unique:true })
academicReportId:number | null;

@Column("int",{ name:"class_id",nullable:true,unique:true })
classId:number | null;

@ManyToOne(()=>AcademicReport,academicReport=>academicReport.academicReportClasses)
@JoinColumn([{ name: "academic_report_id", referencedColumnName: "academicReportId" },
])

academicReport:AcademicReport;

@ManyToOne(()=>Class,cls=>cls.academicReportClasses)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

}
