import { Column, Entity, Index } from "typeorm";

@Index("PK_Temp_Evaluation_Report_Items_Keys", ["itemKeyId"], { unique: true })
@Entity("Temp_Evaluation_Report_Items_Keys", { schema: "dbo" })
export class TempEvaluationReportItemsKeys {
  @Column("int", { primary: true, name: "item_key_id" })
  itemKeyId: number;

  @Column("nchar", { name: "item_key_value", nullable: true, length: 50 })
  itemKeyValue: string | null;
}
