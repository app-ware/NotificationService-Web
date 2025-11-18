import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__tbEyeLoc__3214EC274B5EE0C3", ["id"], { unique: true })
@Entity("tbEyeLockEmployeeLink", { schema: "dbo" })
export class TbEyeLockEmployeeLink {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "PersonID" })
  personId: string;

  @Column("int", { name: "EmployeeID" })
  employeeId: number;
}
