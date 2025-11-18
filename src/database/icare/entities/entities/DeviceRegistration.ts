import {Column,Entity,Index,PrimaryGeneratedColumn} from "typeorm";


@Index("device_type",["deviceType",],{  })
@Index("parent_id",["parentId",],{  })
@Index("PK_Device_Registration",["deviceId",],{ unique:true })
@Entity("Device_Registration" ,{schema:"dbo" } )
export  class DeviceRegistration {

@PrimaryGeneratedColumn({ type:"int", name:"device_id" })
deviceId:number;

@Column("nvarchar",{ name:"device_reg_id",nullable:true })
deviceRegId:string | null;

@Column("int",{ name:"device_type",nullable:true })
deviceType:number | null;

@Column("date",{ name:"registration_date",nullable:true })
registrationDate:Date | null;

@Column("nvarchar",{ name:"token",nullable:true })
token:string | null;

@Column("bit",{ name:"is_active",nullable:true })
isActive:boolean | null;

@Column("bit",{ name:"is_primary",nullable:true })
isPrimary:boolean | null;

@Column("nvarchar",{ name:"parent_id",nullable:true,length:250 })
parentId:string | null;

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

@Column("datetime",{ name:"last_update",nullable:true,default: () => "getutcdate()", })
lastUpdate:Date | null;

@Column("nvarchar",{ name:"device_uuid",nullable:true })
deviceUuid:string | null;

}
