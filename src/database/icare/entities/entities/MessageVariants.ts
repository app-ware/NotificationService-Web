import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Message___3214EC27BCC0E3F8", ["id"], { unique: true })
@Entity("Message_Variants", { schema: "dbo" })
export class MessageVariants {
  @PrimaryGeneratedColumn('increment',{
    name: "ID",
  })
  id: number;

  @Column("numeric", { name: "Type", nullable: true, precision: 18, scale: 0 })
  type: number | null;

  @Column("nvarchar", { name: "Message", nullable: true })
  message: string | null;

  @Column("numeric", {
    name: "center_id",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  centerId: number | null;

  @Column("numeric", {
    name: "do_notify",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  doNotify: number | null;
}
