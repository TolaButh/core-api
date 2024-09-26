import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
    @ApiProperty({
        type:String,
        nullable: true,
    })
    email: string;
  
    @ApiProperty({
        type:String,
        nullable: true,
    })
    newPassword: string;
}
