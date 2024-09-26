import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
    @ApiProperty({
        type:String,
        example: 'A12345679y',
        nullable: true,
    })
    password: string;
  
    @ApiProperty({
        type:String,
        example: 'T123456789y',
        nullable: true,
    })
    newPassword: string;
}
