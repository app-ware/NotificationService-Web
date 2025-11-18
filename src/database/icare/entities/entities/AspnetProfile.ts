import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { AspnetUsers } from "./AspnetUsers";

@Index("PK__aspnet_P__1788CC4CEF3A293C", ["userId"], { unique: true })
@Entity("aspnet_Profile", { schema: "dbo" })
export class AspnetProfile {
  @Column("uniqueidentifier", { primary: true, name: "UserId" })
  userId: string;

  @Column("ntext", { name: "PropertyNames" })
  propertyNames: string;

  @Column("ntext", { name: "PropertyValuesString" })
  propertyValuesString: string;

  @Column("image", { name: "PropertyValuesBinary" })
  propertyValuesBinary: Buffer;

  @Column("datetime", { name: "LastUpdatedDate" })
  lastUpdatedDate: Date;

  @OneToOne(() => AspnetUsers, (aspnetUsers) => aspnetUsers.aspnetProfile)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: AspnetUsers;
}
