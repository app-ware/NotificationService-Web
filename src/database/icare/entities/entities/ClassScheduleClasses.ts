import {Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {Class} from './Class'
import {ClassSchedule} from './ClassSchedule'



@Index("PK__ClassSch__970C3D73DED05B7F",["classScheduleClassId",],{ unique:true })
@Entity("ClassSchedule_Classes" ,{schema:"dbo" } )
export  class ClassScheduleClasses {

@PrimaryGeneratedColumn({ type:"int", name:"classSchedule_class_id" })
classScheduleClassId:number;

@ManyToOne(()=>Class,cls=>cls.classScheduleClasses)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>ClassSchedule,classSchedule=>classSchedule.classScheduleClasses)
@JoinColumn([{ name: "class_schedule_id", referencedColumnName: "classScheduleId" },
])

classSchedule:ClassSchedule;

}
