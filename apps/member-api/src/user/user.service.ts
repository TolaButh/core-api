import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@app/common/entities/Users';
import { UserDto } from '@app/common/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';
import { LocateUserDto } from './dto/locate-user.dto';
import { Languages } from '@app/common/entities/Languages';
import { Orders } from '@app/common/entities/Orders';
import { Rank } from '@app/common/entities/Rank';
import * as uuid from 'uuid';
import { I18nService } from 'nestjs-i18n';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { Affiliates } from '@app/common/entities/Affiliates';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Languages)
    private langRepository: Repository<Languages>,
    @InjectRepository(Rank)
    private rankRepository: Repository<Rank>,
    private readonly i18nservice: I18nService,
    @InjectRepository(Affiliates)
    private readonly affiliate: Repository<Affiliates>,
  ) {}

  async profile(userAuth: UserDto) {
    let countOrder = await this.ordersRepository.count({
      where: { userId: userAuth.id },
    });
    const totalPrice = await this.ordersRepository.sum('price', {
      userId: userAuth.id,
    });
    const user = await this.userRepository.findOne({
      where: { id: userAuth.id },
    });
    let rank = null;
    let rankForward = null;
    if (user.rankId && user.rankId > 0) {
      rank = await this.rankRepository.findOne({ where: { id: user.rankId } });
      rankForward = await this.rankRepository.findOne({
        where: { id: user.rankId + 1 },
      });
    }
    const orderForward = rankForward.depositTotal - totalPrice;
    return {
      data: {
        ...user,
        countOrder,
        rank,
        rankForward,
        orderForward,
      },
      isSuccess: true,
    };
  }

  async changePassword(id: number, body: ChangePasswordDto) {
    const { password, newPassword } = body;
    const user = await this.userRepository.findOneBy({ id });
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const isValid = await this.comparePasswordHash(user.password, password);
    if (!isValid) {
      throw new BadRequestException('The password comfirm does not match!.');
    }
    await this.userRepository.update(id, { password: hashPassword });
    return {
      message: this.i18nservice.t('test.CHANGE_PASSWORD', {
        lang: user.countryCode.toLocaleLowerCase(),
      }),
    };
  }
 
  async resetPassword(body:ResetPasswordDto){
    try {
    const {email, newPassword} = body;
    const user = await this.userRepository.findOneBy({email});
    const hashPassword = await bcrypt.hash(newPassword, 10);
    if(!user){
      throw new BadRequestException(`The ${email} not found`);
    }
    await this.userRepository.update(user.id, {password: hashPassword});

    return {
      message: 'Reset password successfully',
    }
    } catch (error) {
      throw error;
    }
  }

  async changeUserLocate(id: number, body: LocateUserDto) {
    const { country_code } = body;
    return await this.userRepository.update(id, { countryCode: country_code });
  }

  async getAllLocate() {
    return await this.langRepository.find();
  }

  async findUserByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOneBy({ email });
  }

  async findUserByUsername(username: string): Promise<Users> {
    return await this.userRepository.findOneBy({ username });
  }

  async findUserByMobile(mobile: string): Promise<Users> {
    return await this.userRepository.findOneBy({ mobile });
  }

  async generateApiKey(id: number) {
    const api_key = uuid.v4();
    return await this.userRepository.update(id, { apiKey: api_key });
  }
  async findUserByRef(ref: number):Promise<Users>{
    return await this.userRepository.findOne({where: {id: ref}});
  }


  async comparePasswordHash(
    DbPassword: string,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, DbPassword);
  }

  async countAffilateRegister(id: number):Promise<number>{
    return await this.affiliate.count({where: {parentId: id}});
  }
}
