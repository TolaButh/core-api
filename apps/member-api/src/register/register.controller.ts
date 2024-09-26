import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';

import { RegisterValidationPipes } from './pipes/register-validation.pipes';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiOperation({ description: 'Register' })
  @ApiOkResponse({ description: 'The user register is successfully.' })
  register(@Body(RegisterValidationPipes) body: CreateRegisterDto) {
    return this.registerService.register(body);
  }
}
