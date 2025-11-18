import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {Provider} from './Provider'


@Index("PK__Provider__3B085D8B8D56F4AA",["deviceId",],{ unique:true })
@Entity("Provider_Device_Registration" ,{schema:"dbo" } )
export  class ProviderDeviceRegistration {

@PrimaryGeneratedColumn({ type:"int", name:"device_id" })
deviceId:number;

@Column("int",{ name:"device_type" })
deviceType:number;

@Column("nvarchar",{ name:"device_token" })
deviceToken:string;

@Column("datetime",{ name:"registration_date",nullable:true,default: () => "getdate()", })
registrationDate:Date | null;

@Column("nvarchar",{ name:"time_zone",nullable:true })
timeZone:string | null;

@Column("nvarchar",{ name:"device_model",nullable:true })
deviceModel:string | null;

@Column("nvarchar",{ name:"constructor",nullable:true })
ctor:string | null;

@Column("nvarchar",{ name:"os_version",nullable:true })
osVersion:string | null;

@Column("nvarchar",{ name:"app_version",nullable:true })
appVersion:string | null;

@Column("nvarchar",{ name:"locale",nullable:true,length:50 })
locale:string | null;

@Column("nvarchar",{ name:"app_bundle",nullable:true })
appBundle:string | null;

@Column("datetime",{ name:"last_update",nullable:true })
lastUpdate:Date | null;

@Column("nvarchar",{ name:"device_uuid",nullable:true })
deviceUuid:string | null;

@ManyToOne(()=>Provider,provider=>provider.providerDeviceRegistrations)
@JoinColumn([{ name: "provider_id", referencedColumnName: "providerId" },
])

provider:Provider;

}
