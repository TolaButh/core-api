import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '@app/common/dto/user.dto';
import { User } from '@app/common/decorator/user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LocateUserDto } from './dto/locate-user.dto';
import { ResetPasswordDto } from './dto/reset-password-dto';


@Controller('user')
@ApiTags('USER')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  profile(@User() user: UserDto) {
    return this.userService.profile(user);
  }

  @Put('/password')
  @ApiOperation({ description: 'change password' })
  @ApiOkResponse({ description: 'The use is change password successfully' })
  changePassword(@User() user: UserDto, @Body() body: ChangePasswordDto) {
    const id = user.id;
    return this.userService.changePassword(id, body);
  }

  @Put('locate')
  @ApiOperation({ description: 'change user locate' })
  @ApiOkResponse({ description: 'Change user locate successfully' })
  async changeUserLocate(@User() user: UserDto, @Body() body: LocateUserDto) {
    const id = user.id;
    return await this.userService.changeUserLocate(id, body);
  }

  @Get('locate')
  async getUserLocate() {
    return await this.userService.getAllLocate();
  }

  @Patch('generateApiKey')
  async generateApiKey(@User() user: UserDto) {
    return await this.userService.generateApiKey(user.id);
  }

  @Put('/resetPassword')
  async resetPassword(@Body() body: ResetPasswordDto){
    return await this.userService.resetPassword(body);
  }
  
  @Get("countAffilateRegister")
  countAffilateRegister(@User() user: UserDto) {
    return this.userService.countAffilateRegister(user.id);
  }
}
