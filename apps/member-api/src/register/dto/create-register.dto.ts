import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateRegisterDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '454',
    nullable: true,
  })
  ref_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'tola',
    nullable: true,
  })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'But',
    nullable: true,
  })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'tolabuth',
    nullable: true,
  })
  username: string;

  
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'tolabuth@gmail.com',
    nullable: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'TH',
    nullable: true,
  })
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '0653876641',
    nullable: true,
  })
  mobile: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '1121',
    nullable: true,
  })
  password: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: "UBRU",
    nullable: true,
  })
  address: string;

}
