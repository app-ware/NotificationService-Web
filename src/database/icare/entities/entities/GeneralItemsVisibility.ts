import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__GeneralI__3214EC279453F838", ["id"], { unique: true })
@Entity("GeneralItems_Visibility", { schema: "dbo" })
export class GeneralItemsVisibility {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("char", { name: "v_milk", nullable: true, length: 1 })
  vMilk: string | null;

  @Column("char", { name: "v_hygiene", nullable: true, length: 1 })
  vHygiene: string | null;

  @Column("char", { name: "v_sleep", nullable: true, length: 1 })
  vSleep: string | null;

  @Column("char", { name: "v_water", nullable: true, length: 1 })
  vWater: string | null;

  @Column("char", { name: "v_food", nullable: true, length: 1 })
  vFood: string | null;

  @Column("char", { name: "v_mood", nullable: true, length: 1 })
  vMood: string | null;

  @Column("char", {
    name: "v_temperature",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  vTemperature: string | null;

  @Column("char", {
    name: "v_drink",
    nullable: true,
    length: 1,
    default: () => "(1)",
  })
  vDrink: string | null;
}
