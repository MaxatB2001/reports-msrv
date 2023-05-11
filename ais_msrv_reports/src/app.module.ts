import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZeebeModule, ZeebeServer } from 'nestjs-zeebe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakModule } from './keycloak/keycloak.module';
import { ReportsModule } from './reports/reports.module';
import { Report } from './schemas/report.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: parseInt(process.env.POSTGRESQL_USER),
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASS,
      database: process.env.POSTGRESQL_DB,
      entities: [Report],
      synchronize: true,
      //autoLoadEntities: true
    }
    ),

    ZeebeModule.forRoot({ gatewayAddress: process.env.ZEEBE_ADDRESS }),
    KeycloakModule,
    ReportsModule,
    ],
  providers: [
    ZeebeServer,
    AppService
  ],
  controllers: [AppController],
})
export class AppModule {}
