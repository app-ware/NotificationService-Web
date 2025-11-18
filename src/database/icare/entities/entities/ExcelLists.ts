import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Excel_Lists", { schema: "dbo" })
export class ExcelLists {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "excel_list_identifier", nullable: true })
  excelListIdentifier: number | null;

  @Column("nvarchar", { name: "excel_list_name", nullable: true })
  excelListName: string | null;

  @Column("nvarchar", { name: "excel_list_title", nullable: true })
  excelListTitle: string | null;
}
