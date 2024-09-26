import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@app/common/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
    private readonly i18n: I18nService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const option = { where: [{email: email},{username: email}] };
    const user = await this.userRepository.findOne(option);
  
    if (user) {
      // let DbPassword = agent.password.replace(/^\$2y(.+)$/i, '$2a$1');
      const isValid = await this.comparePasswordHash(user.password, password);
      if (isValid) {
        const { ...result } = user;
        return result;
      }
      return null;
    }
    return null;
  }

  async comparePasswordHash(
    DbPassword: string,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, DbPassword);
  }

  async login(LoginDto: CreateAuthDto) {
    const username = LoginDto.username;
    const password = LoginDto.password;

    const user = await this.validateUser(username, password);
    if (user != null) {
      const payload = { email: username, sub: user.id, id: user.id };
      this.logger.log(`username: ${username} - login success - ${new Date()}`);
      return {
        data: user,
        message: this.i18n.t('test.LOGIN_SUCCESS', {lang: user.countryCode.toLowerCase()}),
        access_token: this.jwtService.sign(payload),
        isSuccess: true,
      };
    }
    this.logger.log(`username: ${username} - login failed - ${new Date()}`);
    throw new HttpException(
      'ข้อมูลการเข้าระบบไม่ถูกต้อง',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async getUserById(id: number): Promise<Users> {
    return this.userRepository.findOneBy({ id });
  }
}
