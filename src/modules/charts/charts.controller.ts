import { Controller, Get } from '@nestjs/common';
import { BASE_API_URL } from 'src/common/constants';
import { ChartsService } from './charts.service';

@Controller(`${BASE_API_URL}/charts`)
export class ChartsController {
  constructor(private chartsService: ChartsService) {}

  @Get('count')
  count() {
    return this.chartsService.chartsCount();
  }
}
