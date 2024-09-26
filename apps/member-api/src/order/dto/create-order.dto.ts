import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

class AddOnOrderDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  comments?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  usernames?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  username?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  answer_number?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  min?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  max?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  posts?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  delay?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  expiry?: string;
}

export class CreateOrderDto {
  @ApiProperty({
    type: String,
    example: 'https:google.com',
  })
  @IsString()
  link: string;

  @ApiProperty({
    type: Number,
    example: 2,
  })
  @IsNumber()
  serviceId: number;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  add_on?: AddOnOrderDto;
}
