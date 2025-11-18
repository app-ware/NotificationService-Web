import { Column, Entity, Index } from "typeorm";

@Index("PK__TenYears__D9DE21FC5CE990D5", ["date"], { unique: true })
@Entity("TenYears", { schema: "dbo" })
export class TenYears {
  @Column("date", { primary: true, name: "date" })
  date: Date;

  @Column("int", { name: "day", nullable: true })
  day: number | null;

  @Column("int", { name: "month", nullable: true })
  month: number | null;

  @Column("date", { name: "FirstOfMonth", nullable: true })
  firstOfMonth: Date | null;

  @Column("nvarchar", { name: "MonthName", nullable: true, length: 30 })
  monthName: string | null;

  @Column("int", { name: "week", nullable: true })
  week: number | null;

  @Column("int", { name: "ISOweek", nullable: true })
  isOweek: number | null;

  @Column("int", { name: "DayOfWeek", nullable: true })
  dayOfWeek: number | null;

  @Column("int", { name: "quarter", nullable: true })
  quarter: number | null;

  @Column("int", { name: "year", nullable: true })
  year: number | null;

  @Column("date", { name: "FirstOfYear", nullable: true })
  firstOfYear: Date | null;

  @Column("char", { name: "Style112", nullable: true, length: 8 })
  style112: string | null;

  @Column("char", { name: "Style101", nullable: true, length: 10 })
  style101: string | null;
}
