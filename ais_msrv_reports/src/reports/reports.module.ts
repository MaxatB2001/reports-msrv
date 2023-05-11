import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import { Report } from 'src/schemas/report.schema';
import { KeycloakModule } from 'src/keycloak/keycloak.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [TypeOrmModule.forFeature([Report]), KeycloakModule]
})
export class ReportsModule {}
