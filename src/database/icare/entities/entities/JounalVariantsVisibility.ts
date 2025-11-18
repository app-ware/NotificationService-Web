import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("JounalVariants_Visibility", { schema: "dbo" })
export class JounalVariantsVisibility {
  
@PrimaryGeneratedColumn("increment", { name: "ID" })
id: number;

  @Column("numeric", {
    name: "VariantID",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  variantId: number | null;

  @Column("char", { name: "learned", nullable: true, length: 1 })
  learned: string | null;

  @Column("char", { name: "developing", nullable: true, length: 1 })
  developing: string | null;

  @Column("char", { name: "learning", nullable: true, length: 1 })
  learning: string | null;
}
