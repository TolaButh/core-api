import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {

    @ApiProperty({
        type:Number,
        example: '100',
        nullable: false,
    })
    amount: number;
  
    @ApiProperty({
        type:Number,
        example: '78',
        nullable: false,
    })
    method_code: number;

    @ApiProperty({
        type:String,
        example: 'THB',
        nullable: false,
    })
    currency: string;

}
