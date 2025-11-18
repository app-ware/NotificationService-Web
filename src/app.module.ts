import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import path from 'path';
import { UserAgentLangResolver } from 'src/common/resolvers/UserAgentLangResolver';
import { icareDbConfig, isecureDbConfig } from 'src/config/database.config';
import { CenterUsers } from 'src/database/isecure/entities/entities/CenterUsers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MssqlClientModule } from './config/mssql/mssql-client.module';
//import { AppLoggerModule } from './common/logger/logger.module';
import { PushNotifcationModule } from './modules/push-notifcation/push-notifcation.module';
import { FirebaseModule } from './modules/firebase/firebase.module';




@Module({
  imports: [
        TypeOrmModule.forRoot(icareDbConfig),
        TypeOrmModule.forRoot(isecureDbConfig),
        I18nModule.forRoot({
        fallbackLanguage: 'en',
        loaderOptions: {
            path: path.join(__dirname, '../i18n/'),
            watch: true,
            includeSubfolders: true,
        },
        resolvers: [
                { use: QueryResolver, options: ['lang'] }, // ?lang=ar
                UserAgentLangResolver,
                new HeaderResolver(['x-custom-lang']),    // custom header
                AcceptLanguageResolver,                   // standard Accept-Language header
            ],
        }),
         TypeOrmModule.forFeature([CenterUsers], 'isecure'),
         MssqlClientModule,
         PushNotifcationModule,
        FirebaseModule,
            ],
            
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
