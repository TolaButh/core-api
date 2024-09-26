import { COUPON_UNUSED } from "@app/common/constants/status";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCouponDto {
    @IsString()
    code: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: 10000,
        description: 'จำนวน',
    })
    amount: number
     
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: 10,
        description: 'จำนวน couponที่ยังใช้ได้',
    })
    remaining: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: 10,
        description: 'จำนวน coupon ใช้ได้ทั้งหมด',
    })
    total: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: 1,
        description: 'สถานะการใช้coupon',
    })
    status: number
    createdAt: Date
    updatedAt: Date
}
