import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IpnService } from './ipn.service';

@Controller('ipn')
export class IpnController {
  constructor(private readonly ipnService: IpnService) { }

  @Post(':alias')
  create(@Param("alias") alias: string, @Body() createIpnDto: any) {
    return this.ipnService.create(alias, createIpnDto);
  }
}
