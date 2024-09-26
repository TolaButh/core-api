import {
  Body,
  Controller,
  Post,
  Patch,
  Delete,
  Param,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiPaginationQuery,
  PaginationOptions,
} from '@app/common/decorator/pagination.decorator';
import {
  ApiPaginationResponse,
  IPagination,
  IPaginationOptions,
} from '@app/common/database/pagination';
import { ApiCommonErrorResponse } from '@app/common/decorator/api-common-error-response.decorator';
import { Bonuses } from '@app/common/entities/Bonuses';

import { BonusService } from './bonus.service';
import { CreateBonusDto } from './dto/create.bonus.dto';
import { UpdateBonusDto } from './dto/update.bonus.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '@app/common/dto/user.dto';
import { User } from '@app/common/decorator/user.decorator';


@Controller('bonuses')
@ApiTags('BONUSES')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Post()
  async create(@Body() body: CreateBonusDto): Promise<Bonuses> {
    return this.bonusService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number,@Body() updateBonusDto: UpdateBonusDto) {
    return await this.bonusService.update(id,updateBonusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.bonusService.remove(id);
  }

  @Get()
  @ApiPaginationQuery()
  @ApiPaginationResponse(Bonuses)
  @ApiCommonErrorResponse()
  async pagination(
    @PaginationOptions() options: IPaginationOptions,
  ): Promise<IPagination<Bonuses>> {
    return this.bonusService.pagination(options);
  }
}
