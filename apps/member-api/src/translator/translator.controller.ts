import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { TranslatorService } from "./translator.service";
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "@app/common/decorator/user.decorator";
import { UserDto } from "@app/common/dto/user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('translators')
@ApiTags('TRANSLATORS')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class TranslatorsController{
  constructor(
    private readonly translatorService: TranslatorService,
  ){}

  @Get()
  getHello(@User() user: UserDto): Promise<string> {
    const id = user.id
    return this.translatorService.getHello(id);
  }

  @Get('/hello')
  async getI18nHello(@I18n() i18n: I18nContext) {
    return await i18n.t('test.ENGLISH');
  }

}