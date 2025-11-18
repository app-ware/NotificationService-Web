import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {Class} from './Class'
import {ClassScheduleDates} from './ClassScheduleDates'


@Index("classSchedule_date_id-INCLUDE-class_id",["classId","classScheduleDateId",],{  })
@Index("classscheduleclassid",["classScheduleDateId","classId",],{  })
@Index("PK__ClassSch__6E148A39FDC5D9A2",["scheduleClassDateId",],{ unique:true })
@Entity("ClassSchedule_Class_Date_Link" ,{schema:"dbo" } )
export  class ClassScheduleClassDateLink {

@PrimaryGeneratedColumn({ type:"int", name:"schedule_class_date_id" })
scheduleClassDateId:number;

@Column("int",{ name:"class_id",nullable:true })
classId:number | null;

@Column("int",{ name:"classSchedule_date_id",nullable:true })
classScheduleDateId:number | null;

@ManyToOne(()=>Class,cls=>cls.classScheduleClassDateLinks)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>ClassScheduleDates,classScheduleDates=>classScheduleDates.classScheduleClassDateLinks)
@JoinColumn([{ name: "classSchedule_date_id", referencedColumnName: "classScheduleDateId" },
])

classScheduleDate:ClassScheduleDates;

}
