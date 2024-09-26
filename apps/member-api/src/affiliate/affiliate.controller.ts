import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AffiliateService } from './affiliate.service';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';

@Controller('affiliate')
@ApiTags('AFFILIATE')
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  @Post()
  create(@Body() createAffiliateDto: CreateAffiliateDto) {
    return this.affiliateService.create(createAffiliateDto);
  }

  @Get()
  findAll() {
    return this.affiliateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliateService.findOne(+id);
  }
}
