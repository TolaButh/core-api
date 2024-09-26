import { ApiProperty } from "@nestjs/swagger";

export class LocateUserDto{
    @ApiProperty({
        type:String,
        example: 'TH',
        nullable: true,
    })
    country_code: string;
}