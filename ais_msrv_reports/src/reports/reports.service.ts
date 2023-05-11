import { Injectable } from '@nestjs/common';
import { CreateReportDto } from 'src/DTO/create-report.dto';
import { Report } from 'src/schemas/report.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportRepo: Repository<Report>) {}
    async createReport(dto: CreateReportDto, creatorId: string) {
        const repo = this.reportRepo.create({...dto, creatorId})
        return await this.reportRepo.save(repo)
      }
    
      async getAllReports(creatorId: string) {
        return await this.reportRepo.find({where: {creatorId}})
      }
    
      async updateReport(id: number, report: Report) {
        return await this.reportRepo.update(id, report);
      }
    
      async getReport(id: number) {
        return await this.reportRepo.findBy({id})
      }
    
      async deleteReport(id: number) {
        return await this.reportRepo.delete(id)
      }
}

