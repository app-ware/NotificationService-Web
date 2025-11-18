import {Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {Class} from './Class'
import {FoodMenu} from './FoodMenu'


@Index("PK__FoodMenu__C26C2AC194BA5A4D",["menuClassId",],{ unique:true })
@Entity("FoodMenu_Classes" ,{schema:"dbo" } )
export  class FoodMenuClasses {

@PrimaryGeneratedColumn({ type:"int", name:"menu_class_id" })
menuClassId:number;

@ManyToOne(()=>Class,cls=>cls.foodMenuClasses)
@JoinColumn([{ name: "class_id", referencedColumnName: "classId" },
])

class:Class;

@ManyToOne(()=>FoodMenu,foodMenu=>foodMenu.foodMenuClasses)
@JoinColumn([{ name: "food_menu_id", referencedColumnName: "foodMenuId" },
])

foodMenu:FoodMenu;

}
