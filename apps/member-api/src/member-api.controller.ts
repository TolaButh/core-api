import { Controller, Get } from '@nestjs/common';
import { MemberApiService } from './member-api.service';

@Controller()
export class MemberApiController {
  constructor(private readonly memberApiService: MemberApiService) {}

  @Get()
  getHello(): string {
    return this.memberApiService.getHello();
  }
}
