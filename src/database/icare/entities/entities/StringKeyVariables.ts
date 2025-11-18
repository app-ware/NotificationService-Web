import { Column, Entity, Index } from "typeorm";

@Index("PK_String_Key_Variables", ["stringKeyVariableId"], { unique: true })
@Entity("String_Key_Variables", { schema: "dbo" })
export class StringKeyVariables {
  @Column("int", { primary: true, name: "string_key_variable_id" })
  stringKeyVariableId: number;

  @Column("nvarchar", { name: "string_key_variable", nullable: true })
  stringKeyVariable: string | null;
}
