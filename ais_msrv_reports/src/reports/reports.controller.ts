import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard, AuthenticatedUser } from 'nest-keycloak-connect';
import { Report } from 'src/schemas/report.schema';
import { CreateReportDto } from 'src/DTO/create-report.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RESOURCES } from 'src/resources';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { AuthDecorator } from 'src/decorators/auth.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('api/reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Get()
  syncResource() {
    return RESOURCES;
  }

  @Post('/')
  @UseInterceptors(TokenInterceptor)
  @AuthDecorator()
  post_reports_Report(
    @AuthenticatedUser() user: any,
    @Body() dto: CreateReportDto,
  ) {
    console.log(dto);
    return this.reportService.createReport(dto, user.sub);
  }
  
  @Get('/all')
  @UseInterceptors(TokenInterceptor)
  @AuthDecorator()
  get_reports_all(@AuthenticatedUser() user: any) {
    return this.reportService.getAllReports(user.sub);
  }

  @Get('/:id')
  @UseInterceptors(TokenInterceptor)
  @AuthDecorator()
  get_reports_Report(@AuthenticatedUser() user: any, @Param('id') id: number) {
    return this.reportService.getReport(id);
  }

  @Patch('/:id')
  @UseInterceptors(TokenInterceptor)
  @AuthDecorator()
  update_reports_Report(@AuthenticatedUser() user: any, @Param('id') id: number, @Body() report: Report) {
    return this.reportService.updateReport(id, report);
  }

  @Delete('/:id')
  @UseInterceptors(TokenInterceptor)
  @AuthDecorator()
  delete_reports_Report(@AuthenticatedUser() user: any, @Param('id') id: number) {
    return this.reportService.deleteReport(id);
  }
}
