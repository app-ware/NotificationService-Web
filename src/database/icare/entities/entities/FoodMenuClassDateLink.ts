import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {Class} from './Class'
import {FoodMenuDates} from './FoodMenuDates'


@Index("foodmenuclassid",["menuDateId","classId",],{  })
@Index("menu_date_id-INCLUDE-class_id",["classId","menuDateId",],{  })
@Index("PK__FoodMenu__DED887BD1BA0921D",["menuClassDateId",],{ unique:true })
@Entity("FoodMenu_Class_Date_Link" ,{schema:"dbo" } )
export  class FoodMenuClassDateLink {

@PrimaryGeneratedColumn({ type:"int", name:"menu_class_date_id" })
menuClassDateId:number;

@Column("int",{ name:"class_id",nullable:true })
classId:number | null;

@Column("int",{ name:"menu_date_id",nullable:true })
menuDateId:number | null;

@ManyToOne(()=>Class,cls=>cls.foodMenuClassDateLinks)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>FoodMenuDates,foodMenuDates=>foodMenuDates.foodMenuClassDateLinks)
@JoinColumn([{ name: "menu_date_id", referencedColumnName: "menuDateId" },
])

menuDate:FoodMenuDates;

}
