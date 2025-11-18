import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParentReadDataMenu } from "./ParentReadDataMenu";

@Index("PK__Menu_Ima__3214EC27979226B5", ["id"], { unique: true })
@Entity("Menu_Image", { schema: "dbo" })
export class MenuImage {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "class_id", nullable: true })
  classId: number | null;

  @Column("nvarchar", { name: "menu_url", nullable: true })
  menuUrl: string | null;

  @Column("datetime", { name: "LastSaved", nullable: true })
  lastSaved: Date | null;

  @Column("int", { name: "academic_year_id", nullable: true })
  academicYearId: number | null;

  @OneToMany(
    () => ParentReadDataMenu,
    (parentReadDataMenu) => parentReadDataMenu.menu
  )
  parentReadDataMenus: ParentReadDataMenu[];
}
