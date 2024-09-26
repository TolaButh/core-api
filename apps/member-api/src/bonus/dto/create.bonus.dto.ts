import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber } from "class-validator";

export class CreateBonusDto{
    @IsEmpty()
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: '500',
        required: true,
        description: 'ยอดเงินโบนัส',
      })
    amount: number;

    @IsEmpty()
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: '3',
        required: true,
        description: 'percent ที่ได้รับโบนัสจากยอด',
      })
    percent: number;


}